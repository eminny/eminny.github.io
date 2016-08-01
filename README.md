# CANDER PARIS

### Deployment

To deploy to staging, add `[deploy: staging]` flag to the end of the commit message.

To deploy to production, add `[deploy: production]`.

Note that because the `build` directory is ignored in the repo, the server will run `npm install` and `gulp build` after each deploy.
