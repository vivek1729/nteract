import { RecordOf } from "immutable";
import { applyMiddleware, combineReducers, createStore, Middleware, ReducersMapObject, Store } from "redux";
import { combineEpics, createEpicMiddleware, Epic, StateObservable } from "redux-observable";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { MythicAction, MythicPackage } from "./types";

type UnionOfProperty<U, P extends string> = (
  U extends { [key in P]: any }
    ? U[P]
    : never
);

export const makeConfigureStore = <STATE = {}>() =>
  <DEPS, PKGS extends MythicPackage>(
    definition: {
      packages: PKGS[],
      reducers?: ReducersMapObject<Omit<STATE, "__private__">, any>
      epics?: Epic[],
      epicMiddleware?: Middleware[],
      epicDependencies?: DEPS,
      enhancer?: (enhancer: any) => any,
    }
  ) => {
    const reducers = definition.packages
      .map(pkg => ({ [pkg.name]: pkg.rootReducer }))
      .reduce(Object.assign, {});

    const rootReducer = combineReducers(
      Object.assign(
        definition.reducers ?? {},
        {
          __private__: combineReducers(reducers),
        },
      )
    );

    const epicMiddleware = createEpicMiddleware<any, any, STATE, any>({
      dependencies: definition.epicDependencies ?? {},
    });

    const rootEpic = (
      action$: Observable<any>,
      store$: StateObservable<any>,
      dependencies: any,
    ) =>
      combineEpics(
        ...(definition.epics ?? []),
        ...definition.packages
          .map(pkg => pkg.makeRootEpic()),
      )(action$, store$, dependencies).pipe(
        catchError((error: any, source: Observable<any>) => {
          console.error(error);
          return source;
        })
      );

    return (
      (initialState?: STATE) => {
        const baseEnhancer = applyMiddleware(
          epicMiddleware,
          ...(definition.epicMiddleware ?? []),
        );
        const store = createStore(
          rootReducer as any,
          initialState,
          definition.enhancer
            ? definition.enhancer(baseEnhancer)
            : baseEnhancer,
        ) as Store<RecordOf<STATE & {
          __private__: {
            [key in UnionOfProperty<PKGS, "name">]:
            UnionOfProperty<PKGS, "initialState">;
          };
        }>, MythicAction>;

        epicMiddleware.run(rootEpic);

        return store;
      }
    );
  };
