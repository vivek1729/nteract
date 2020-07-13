# @nteract/web

** WARNING: This application is still under development and not fully functional.**

This application is a NextJS-based web application that hosts an nteract-based UI and connects to kernels provided by Binder. This web application is a great way to test changes on the nteract core SDK without requiring a Jupyter setup on the dev machine.

## Developer Setup

After cloning the nteract monorepo, run `yarn` and `yarn build` in the root of the repository. Then, navigate to this application's directory.

```
$ cd applications/web
```

And run `yarn dev` to run a local instance of the application.

## Usage

Currently, to use the application, you must navigate to a specific url with the following structure.

```
http://localhost:3000/p/gh/${github_org}/${github_repo}/${github_branch}/${foldername}/${filename}
```

An example URL is provided below.

http://localhost:3000/p/gh/nteract/examples/master/happiness.ipynb

## License

[BSD-3-Clause](https://choosealicense.com/licenses/bsd-3-clause/)
