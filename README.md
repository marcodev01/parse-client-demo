# parse-client-demo
PWA App to demonstrate some of the parse server features. The PWA App is based on [Vue.js v3](https://vuejs.org/guide/introduction.html).

## App features
- User Registration and Login
- Add new entries (technically a Parse Object - for complex Parse Objects see: https://docs.parseplatform.org/js/guide/#parseobject)
- List all persisted entries
- Enable / disable WebSocket updates for create, update and delete events
- Persist user settings

Note: Unfortunately, push notifications are not supported by the Parse Javascript SDK (only by the native Parse IOS, Android, .NET SDKs). Therefore, push notifications are not implemented in this demo PWA app. However, technically push notifications could be implemented manually: [MDN: How to make PWAs re-engageable using Notifications and Push](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Re-engageable_Notifications_Push)

## Parse-Client settings
- Set your specfied parse server id `parseAppId` in `src/parseSettings.json`
- Set your parse server url `parseServerUrl` in `src/parseServerUrl.json`

## Development project setup
- Preconditions: nodeJS and npm
- install dependencies: `npm install`
- run and hot-reload for development: `npm run serve`

### Compile and minifie for production
- compile for production: `npm run build`
- compile and run as installable PWA: `npm run build && npx http-server dist`
  - Open in Browser (e.g. Chrome) and click on install in the adress bar to install the PWA App locally.
### Customize configuration
- See [Configuration Reference](https://cli.vuejs.org/config/).

## Project dependencies
- [Vue.js v3](https://vuejs.org/guide/introduction.html)
- [PrimeVue](https://www.primefaces.org/primevue/setup)
- [PrimeFlex](https://www.primefaces.org/primeflex/)
- [Parse JavaScript SDK](https://docs.parseplatform.org/js/guide/)

