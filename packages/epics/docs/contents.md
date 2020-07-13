# Contents Epics

Contents epics handle content-related actions, such as fetching contents from a server, saving contents, and more.

## updateContentEpic

This epic is triggered whenever a `ChangeContentName` action is dispatched. It sends a `PUT` request to the Jupyter server to update the filename of a particular piece of content.

## fetchContentEpic

This epics is triggered whenever a `FetchContent` action is dispatched. It sends a `GET` request to the Jupyter server to retrieve the contents and metadata of a piece of content.

## autoSaveCurrentContentEpic

This epic is triggered at a user-defined interval and saves the users contents by sending a network request to the Jupyter server.

## saveContentEpic

This epic is triggered whenever a `Save` or `DownloadContent` action is triggered. When the action is `DownloadContent` it serializes the contents of the notebook and triggers a download event in the browser. When the action is `Save` it saves the contents of the notebook using the Jupyter server API.

## saveAsContentEpic

This epic is triggered whenever a `SaveAs` action is triggered. It should be used when the file you are saving does not exist on the filesystem the Jupyter server is running in.

## closeNotebookEpic

This epic is triggered whenever `CloseNotebook` action is dispatched. It maps the `CloseNotebook` action to `DisponseContent` and `KillKernel` actions.
