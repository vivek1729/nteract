import { of, Subject } from "rxjs";
import { toArray } from "rxjs/operators";
import Immutable from "immutable";

import * as actions from "@nteract/actions";
import { COMM_MESSAGE, COMM_OPEN, EXECUTE_FAILED } from "@nteract/actions";
import { StateObservable } from "redux-observable";
import { commListenEpic } from "../src/comm";

import {
  makeAppRecord,
  makeCommsRecord,
  makeStateRecord,
  makeEntitiesRecord,
  makeHostsRecord,
  makeContentsRecord,
  makeDummyContentRecord,
  ContentRecord,
  createContentRef,
  createKernelspecsRef,
  makeTransformsRecord
} from "@nteract/types";

describe("commActionObservable", () => {
  test("emits COMM_OPEN and COMM_MESSAGE given the right messages", done => {
    const commOpenMessage = {
      header: { msg_type: "comm_open" },
      content: {
        data: "DATA",
        metadata: "0",
        comm_id: "0123",
        target_name: "daredevil",
        target_module: "murdock"
      },
      buffers: new Uint8Array([])
    };

    const contentRef = createContentRef();
    const kernelspecsRef = createKernelspecsRef();

    const state = {
      app: makeAppRecord({
        version: "test"
      }),
      comms: makeCommsRecord(),
      config: Immutable.Map({
        theme: "light"
      }),
      core: makeStateRecord({
        currentKernelspecsRef: kernelspecsRef,
        entities: makeEntitiesRecord({
          hosts: makeHostsRecord({}),
          contents: makeContentsRecord({
            byRef: Immutable.Map<string, ContentRecord>().set(
              contentRef,
              makeDummyContentRecord({
                filepath: "test.ipynb"
              })
            )
          }),
          transforms: makeTransformsRecord({
            displayOrder: Immutable.List([]),
            byId: Immutable.Map({})
          })
        })
      })
    };

    const commMessage = {
      header: { msg_type: "comm_msg" },
      content: { data: "DATA", comm_id: "0123" },
      buffers: new Uint8Array([])
    };

    const action = of(
      actions.launchKernelSuccessful({
        kernel: {
          channels: of(commOpenMessage, commMessage) as Subject<any>,
          cwd: "/home/tester",
          type: "websocket"
        },
        kernelRef: "fakeKernelRef",
        contentRef: "fakeContentRef",
        selectNextKernel: false
      })
    );

    commListenEpic(action, new StateObservable(new Subject(), state))
      .pipe(toArray())
      .subscribe(
        actions => {
          expect(actions).toEqual([
            {
              type: "COMM_OPEN",
              data: "DATA",
              metadata: "0",
              comm_id: "0123",
              target_name: "daredevil",
              target_module: "murdock",
              buffers: new Uint8Array([])
            },
            {
              type: "COMM_MESSAGE",
              data: "DATA",
              comm_id: "0123",
              buffers: new Uint8Array([])
            }
          ]);
        },
        err => done.fail(err),
        () => done()
      ); // It should not error in the stream
  });

  test("on kernel error executeFailed action is returned", done => {

    const contentRef = "fakeContentRef";
    const kernelspecsRef = createKernelspecsRef();

    const state = {
      app: makeAppRecord({
        version: "test"
      }),
      comms: makeCommsRecord(),
      config: Immutable.Map({
        theme: "light"
      }),
      core: makeStateRecord({
        currentKernelspecsRef: kernelspecsRef,
        entities: makeEntitiesRecord({
          hosts: makeHostsRecord({}),
          contents: makeContentsRecord({
            byRef: Immutable.Map<string, ContentRecord>().set(
              contentRef,
              makeDummyContentRecord({
                filepath: "test.ipynb"
              })
            )
          }),
          transforms: makeTransformsRecord({
            displayOrder: Immutable.List([]),
            byId: Immutable.Map({})
          })
        })
      })
    };

    const sent = new Subject();
    const received = new Subject();
    received.hasError = true;

    const mockSocket = Subject.create(sent, received);

    const action = of(
      actions.launchKernelSuccessful({
        kernel: {
          channels: mockSocket,
          cwd: "/home/tester",
          type: "websocket"
        },
        kernelRef: "fakeKernelRef",
        contentRef: "fakeContentRef",
        selectNextKernel: false
      })
    );

    commListenEpic(action, new StateObservable(new Subject(), state))
      .pipe(toArray())
      .subscribe(
        actions => {
          expect(actions).toEqual([
            {
              type: EXECUTE_FAILED,
              error: true,
              payload: {
                code:"EXEC_WEBSOCKET_ERROR",
                contentRef: "fakeContentRef",
                error: new Error(
                  "The WebSocket connection has unexpectedly disconnected."
                  )  
              }
            },
            {
              type: EXECUTE_FAILED,
              error: true,
              payload: {
                code:"EXEC_WEBSOCKET_ERROR", 
                contentRef: "fakeContentRef",
                error: new Error(
                  "The WebSocket connection has unexpectedly disconnected."
                  )
              }
            },
            {
              type: EXECUTE_FAILED,
              error: true,
              payload: {
                code:"EXEC_WEBSOCKET_ERROR",
                contentRef: "fakeContentRef",
                error: new Error(
                  "The WebSocket connection has unexpectedly disconnected."
                  )  
              }
            }
          ]
          );
        },
        err => done.fail(err),
        () => done()
      ); // It should not error in the stream
  });
});
