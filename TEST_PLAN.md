When releasing the nteract desktop app, run through the following test plan to ensure that everything is A-OK before releasing.

Before starting the test plan, build the distributed nteract assets using the command below. This command will generate a set of binaries that will be stored in teh `applications/desktop/dist` directory.

```
$ yarn dist:all
```

If possible, run through this test plan on the different supported operating system: Windows, macOS, and Linux.

**Scenario 1: Opening and editing an existing notebook**

1. Open an existing notebook using the File > Open window.
2. Run the first cell in the notebook.
3. Ensure that the kernel launches and the cell executes.
4. Modify the notebook by adding a new cell and running it.
5. Save the notebook.
6. Close the notebook ad open it again. Confirm that you're changes have been saved.

**Scenario 2: Modifying the notebook UI**

1. Toggle the output and input visibility of a notebook and verify that it works.
2. Toggle whether or not an output is expanded and verify that it works.
3. Toggle the theme of the notebook and verify that it is changed.
4. Toggle some codemirror settings and observe that they are set.
5. Close the nteract desktop app.
6. Open the nteract desktop app and confirm that saved configurations are reloaded.

**Scenario 3: Testing notebook features**

1. Open a notebook with `ipywidgets` and confirm that they work.
2. Open a notebook with a data explorer visualization and confirm that it works.
3. Open a notebook with a GeoJSON map and confirm that it works.