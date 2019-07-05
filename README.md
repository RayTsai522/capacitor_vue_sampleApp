## Building a sample app with ionic capacitor and vuejs

* This app was created using the `npx @capacitor/cli create` command
* The vuejs project was created using vue cli 2 `npm install -g vue-cli`

### Running this example app on different platforms

* To run this sample app on web:
```bash
npx cap serve
```
* To run this sample app on Electron:
```bash
cd electron
npm run electron:start
```

* To run this sample app on ios and Android:
iOS requires using Xcode to run this app
```bash
npx cap open ios
```
Once Xcode launches, you can build/simulate/run your app through the standard Xcode workflow.

Once Android Studio launches, you can build/emulate/run your app through the standard Android Studio workflow.
```bash
npx cap open android
```