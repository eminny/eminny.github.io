# CANDER PARIS

### Development setup

#### Prerequisites

Ensure you have the following binaries installed on your dev machine
- Node/NPM
- Nodenv
- Yarn
- Gulp
- Ruby

#### Preparing your dev machine

- Install node 6.10.3
    - `nodenv install 6.10.3`
- Install some system wide Ruby gems
    - `sudo gem install sass`
    - `sudo gem install compass`
    - `sudo gem install breakpoint`
    - `sudo gem install susy`
    - `sudo gem install modular-scale`

#### Building the code

Run `yarn install` to pull in dependencies.

Next, run `gulp` to watch for live file changes to files in `src/` and compile the new build on the fly. Gulp should have been installed when you ran `npm install`, but if it is not found, just run `npm install -g gulp`.

Run `gulp build` to compile and build all production ready files. View `gulpfile.babel.js` to see each step of the build process.

**Important:** You will only want to alter files in the `src/` directory. Do not alter files in `build/`, as these will get overwritten in a subsequent build.

### Front end overview

The core functionality is built on [Vue.js](https://vuejs.org/), which handles the Single-Page-App-style routing and views. jQuery is not used since the majority of DOM updates are made through Vue.js. However, `src/helpers.js` contains some DOM manipulation helper functions.

### Structure

The structure is similar to that of any typical Vue.js app: `src/main.js` initializes things, `src/routes.js` contains the routes, `src/store.js` contains the "global" or shared data store, and all files ending in `.vue` are reusable components. Vue takes an approach that is very similar to React: it’s components all the way down.

### Browsersync

[Browsersync](https://www.browsersync.io/) provides the local server with user-event syncing between devices. Whenever you run the default `gulp` command, Browsersync will be automatically invoked. A a new Chrome tab will open to `localhost` (port `3000` if it's free).

### Deployment

Push to master on the [GH Pages repo](https://github.com/eminny/eminny.github.io) will deploy changes. 
