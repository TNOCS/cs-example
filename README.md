# cs-example

Example of a client and server that use the csnext dashboard.

## Prerequisites

We use `lerna` to manage plugin dependencies and `yarn` for installing packages, so you need them both, globally. We also use `nodemon` to run the local server.
```console
npm i -g lerna yarn
```

# Installation

To develop client, server and new plugins, run the following command from the root folder:

```console
yarn
```

This is the same as `yarn install` and it will install all dependencies, among others, the @csnext dependencies.

As we haven't published csnext yet, also run `yarn run link` to link to the (locally installed) @csnext dependencies.

## Package overview

- src/client: example client
- src/server: example server

## Developing your own client

Fork this project.

Run `yarn start` to let `fuse-box` transpile your typescript code to a vendor and app package in the `dist/client` folder. Visit [http://localhost:3456](http://localhost:3456) to watch the results.

In case you want to develop new plugins too, run `yarn run link` so you will create symbolic links to the csnext dependencies (which must have been installed already).

You can deploy your client using `yarn run prod`.

## Developing your own server

As above, but run `yarn run build` to transpile your project, and `yarn run server`
Run `yarn start` to let `fuse-box` transpile your typescript code to a vendor and app package in the `dist/client` folder.
