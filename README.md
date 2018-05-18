# vue-pwa-firecloud

build pwa app using `vue` and `firecloud`

## How to generate service worker

```bash
npm i -g sw-precache
sw-precache --config sw-config.js
```

## How to clear cache when developing

Goto `Developer Tools -> Application -> Cache` to clear the cache. Otherwise your change will _NOT_ being reflected immedidately.
