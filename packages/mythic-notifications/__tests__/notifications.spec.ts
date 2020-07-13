import { notifications, sendNotification } from "@nteract/mythic-notifications";

describe("notifications", () => {
  test("emits a notification when sendNotification is reduced", () => {
    const originalState = notifications.makeStateRecord({
      current: {
        addNotification: jest.fn(),
      },
    });

    const state = notifications.rootReducer(originalState,
      sendNotification.create({
        title: "add me add me add me",
        message: "you just gotta addNotification() me",
        level: "info",
      },
    ));

    expect(state).toEqual(originalState);
    expect(state.current.addNotification).toBeCalledTimes(1);
  });

  test("emits sendNotification on an error action", () => {
    notifications.testMarbles(
      "ab|",
      "AB|",
      {
        a: {
          type: "catContent/downloadFailed",
          error: true,
          payload: {
            contentRef: "🐈 cat content 🐈",
            error: new Error("😿 no new cat pics found 😿"),
          },
        },
        b: {
          type: "CORE/BAD_BAD_NOT_GOOD_ERROR",
          error: true,
          payload: new Error("🙀"),
        },
        A: sendNotification.create({
          title: "Download failed",
          message: "😿 no new cat pics found 😿",
          level: "error",
        }),
        B: sendNotification.create({
          title: "Bad bad not good error",
          message: "🙀",
          level: "error",
        }),
      },
    );
  });
});
