import { Stats } from "fs";
import { LocalContentProvider } from "../../src/notebook/local-content-provider";
import { IContent } from "@nteract/core";
import { stringifyNotebook, Notebook } from "@nteract/commutable";
import { fixture } from "@nteract/fixtures";

jest.mock("fs");
const fs = require("fs");

const fileStat: Partial<Stats> = {
  isFile: () => true,
  mode: fs.constants.W_OK,
  birthtime: new Date(),
  mtime: new Date()
};
const fileContentJSON: Notebook = JSON.parse(fixture);
const localContentProvider = new LocalContentProvider();

describe("get", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    fs.stat.mockImplementation((path, callback) => {
      callback(null, fileStat);
    });

    fs.readFile.mockImplementation((path, callback) => {
      callback(null, Buffer.from(stringifyNotebook(fileContentJSON)));
    });
  });

  it("errors on stat issue", async () => {
    // stat fails for some reason
    fs.stat.mockImplementation((path, callback) => {
      callback(new Error("forced failure"));
    });

    let response = await localContentProvider.get(null, "path", null).toPromise();
    expect(fs.stat).toBeCalledWith("path", expect.any(Function));
    expect(response.status).toBe(404);
  });

  it("errors on readFile issue", async () => {
    // readFile fails for some reason
    fs.readFile.mockImplementation((path, callback) => {
      callback(new Error("forced failure"));
    });

    let response = await localContentProvider.get(null, "path", { content: 1 }).toPromise();
    expect(fs.readFile).toBeCalledWith("path", expect.any(Function));
    expect(response.status).toBe(404);
  });

  it("reads notebook without content", async () => {
    let response = await localContentProvider.get(null, "path", { content: 0 }).toPromise();
    expect(fs.stat).toBeCalledWith("path", expect.any(Function));
    expect(response.status).toBe(200);
    expect(response.response).toEqual({
      name: "path",
      path: "path",
      type: "notebook",
      writable: true,
      created: fileStat.birthtime.toString(),
      last_modified: fileStat.mtime.toString(),
      mimetype: "application/x-ipynb+json",
      content: null,
      format: "json"
    });
  });

  it("reads notebook with content", async () => {
    let response = await localContentProvider.get(null, "path", { content: 1 }).toPromise();
    expect(fs.stat).toBeCalledWith("path", expect.any(Function));
    expect(fs.readFile).toBeCalledWith("path", expect.any(Function));
    expect(response.status).toBe(200);
    expect(response.response).toEqual({
      name: "path",
      path: "path",
      type: "notebook",
      writable: true,
      created: fileStat.birthtime.toString(),
      last_modified: fileStat.mtime.toString(),
      mimetype: "application/x-ipynb+json",
      content: fileContentJSON,
      format: "json"
    });
  });
});

describe("save", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    fs.stat.mockImplementation((path, callback) => {
      callback(null, fileStat);
    });

    fs.writeFile.mockImplementation((path, data, callback) => callback());
  });

  it("errors on null content", async () => {
    let response = await localContentProvider.save(null, "path", { content: null }).toPromise();
    expect(response.status).toBe(400);
  });

  it("errors on content with unsupported type", async () => {
    let response = await localContentProvider.save(null, "path", { content: fileContentJSON, type: "file" }).toPromise();
    expect(response.status).toBe(400);
  });

  it("errors on writeFile issue", async () => {
    // writeFile fails for some reason
    fs.writeFile.mockImplementation((path, data, callback) => {
      callback(new Error("forced failure"));
    });

    const data: Partial<IContent<"notebook">> = {
      content: fileContentJSON,
      type: "notebook"
    };

    let response = await localContentProvider.save(null, "path", data).toPromise();
    expect(fs.writeFile).toBeCalledWith("path", stringifyNotebook(data.content), expect.any(Function));
    expect(response.status).toBe(500);
  });

  it("errors on stat issue", async () => {
    // stat fails for some reason
    fs.stat.mockImplementation((path, callback) => {
      callback(new Error("forced failure"));
    });

    const data: Partial<IContent<"notebook">> = {
      content: fileContentJSON,
      type: "notebook"
    };

    let response = await localContentProvider.save(null, "path", data).toPromise();
    expect(fs.writeFile).toBeCalledWith("path", stringifyNotebook(data.content), expect.any(Function));
    expect(fs.stat).toBeCalledWith("path", expect.any(Function));
    expect(response.status).toBe(404);
  });

  it("writes notebook", async () => {
    const data: Partial<IContent<"notebook">> = {
      content: fileContentJSON,
      type: "notebook"
    };

    let response = await localContentProvider.save(null, "path", data).toPromise();
    expect(fs.writeFile).toBeCalledWith("path", stringifyNotebook(data.content), expect.any(Function));
    expect(fs.stat).toBeCalledWith("path", expect.any(Function));
    expect(response.status).toBe(200);
    expect(response.response).toEqual({
      name: "path",
      path: "path",
      type: "notebook",
      writable: true,
      created: fileStat.birthtime.toString(),
      last_modified: fileStat.mtime.toString(),
      mimetype: "application/x-ipynb+json",
      content: data.content,
      format: "json"
    });
  });
});
