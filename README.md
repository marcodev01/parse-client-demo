# parse-client-demo
PWA App to demonstrate some of the parse server features. The PWA App is based on [Vue.js v3](https://vuejs.org/guide/introduction.html).

## App features
- User [registration](https://docs.parseplatform.org/js/guide/#signing-up) and [login](https://docs.parseplatform.org/js/guide/#logging-in)
- Add new rating entries (simple [Parse Object](https://docs.parseplatform.org/js/guide/#objects))
- List all persisted rating entries by [Queries](https://docs.parseplatform.org/js/guide/#queries)
- Enable / disable WebSocket updates for create, update and delete events by [Live Queries](https://docs.parseplatform.org/js/guide/#live-queries)
- Persist user specific properties (websocket on/off) in [Parse User Object](https://docs.parseplatform.org/js/guide/#users)

Note: Unfortunately, [push notifications](https://docs.parseplatform.org/js/guide/#push-notifications) are not supported by the Parse Javascript SDK (supported only for native IOS, Android, .NET Parse SDKs). Therefore, push notifications are not implemented in this PWA demo app. However, technically push notifications could be implemented manually: [MDN: How to make PWAs re-engageable using Notifications and Push](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Re-engageable_Notifications_Push)

## Parse-Client set up
- Set your parse server id `VUE_APP_PARSE_SERVER_APPLICATION_ID` in `.env`
- Set parse server https url `VUE_APP_PARSE_SERVER_URL` in `.env`

## Project setup for development
- Preconditions: **nodeJS** and **npm** must be installed
- Install dependencies: `npm install`
- Run and hot-reload for development: `npm run serve`

### Compile and minifie locally for production
- Compile for production: `npm run build`
- Compile and run as installable PWA: `npm run build && npx http-server dist`
  - Open in browser (e.g. Chrome) and click on install in the adress bar to install the PWA App locally.

### Customize configuration
- See [Configuration Reference](https://cli.vuejs.org/config/).

## Project dependencies
- [Vue.js v3](https://vuejs.org/guide/introduction.html)
- [PrimeVue](https://www.primefaces.org/primevue/setup)
- [PrimeFlex](https://www.primefaces.org/primeflex/)
- [Parse JavaScript SDK](https://docs.parseplatform.org/js/guide/)

