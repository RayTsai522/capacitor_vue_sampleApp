# Building a sample app with ionic capacitor and vue.js

* This app was created using the `npx @capacitor/cli create` command
* The vue.js project was created using vue cli 2 `npm install -g vue-cli`

## Running this example app on different platforms

### To run this sample app on web:
```bash
npx cap serve
```
### To run this sample app on Electron:
```bash
cd electron
npm run electron:start
```

### To run this sample app on ios and Android:
iOS requires using Xcode to run this app
```bash
npx cap open ios
```
Once Xcode launches, you can build/simulate/run your app through the standard Xcode workflow.

Once Android Studio launches, you can build/emulate/run your app through the standard Android Studio workflow.
```bash
npx cap open android
```

## When you modify your Vue.js project
### Run the command below to build your project:
```bash
cd vue
npm run build
```
### Once your vue.js project is built, it needs to be copied to each native project:
```bash
npx copy android
npx copy ios
npx copy electron
```

