# CANDER PARIS

### Get up and running

Run `npm install` to pull in dependencies. (Note: [npm](https://www.npmjs.com/) must be installed.)

For local development and testing, you must have a local server setup with [canderparis.dev](http://canderparis.dev/) resolving from the `build/` directory.

Once the local server is set up, run `gulp` to watch for live file changes to files in `src/` and compile the new build on the fly. Gulp should have been installed when you ran `npm install`, but if it is not found, just run `npm install -g gulp`.

**Important:** You will only want to alter files in the `src/` directory. Do not alter files in `build/`, as these will get overwritten in a subsequent build.

### Front end overview

The core functionality is built on [Vue.js](https://vuejs.org/), which handles the Single-Page-App-style routing and views. jQuery is not used since the majority of DOM updates are made through Vue.js. However, `src/helpers.js` contains some [jQuery-like helper functions](http://youmightnotneedjquery.com/).

### Structure

The structure is similar to that of any typical Vue.js app: `src/main.js` initializes things, `src/routes.js` contains the routes, `src/store.js` contains the "global" or shared data store, and all files ending in `.vue` are reusable components. Vue takes an approach that is very similar to React: it’s components all the way down.

### Browsersync

[Browsersync](https://www.browsersync.io/) is used for browser testing. Whenever you run the default `gulp` command, Browsersync will be automatically invoked. A a new Chrome tab will open to `localhost` (port `8080` if it's free), and this maps to the already-running `canderparis.dev` server.

### Deployment

To deploy to staging, add `[deploy: staging]` flag to the end of the commit message. Please only use the staging deploy flag when the current branch is `staging`.

To deploy to production, add `[deploy: production]`. Please only use the production deploy flag when the current branch is `master`.