# VIDCHAIN Odyssey

> Mobile App to demo the flow app to app and make the integration with our SSI solution easier.

Read the guide we have prepared for the integration with the library @validatedid/did-auth

https://validatedid.github.io/vidchain-doc/#/did-auth

And in the public library need for the DID auth process:
https://www.npmjs.com/package/@validatedid/did-auth

## Table of Contents

1. [Getting started](#Getting)
2. [Running](#Running)
3. [Testing](#Testing)
4. [Build Troubleshooting](#BuildTroubleshooting)
5. [Licensing](#Licensing)

### Getting started

- React Native
- Jest for testing

Clone the repository and move to the project directory

```sh
git clone https://github.com/validatedid/vidchain-odyssey-app.git
cd /vidchain-odyssey-app
```

The code is built using React-Native and running code locally requires a Mac or Linux OS.

- Install [Node.js](https://nodejs.org) **version 10 (latest stable) and yarn@1 (latest)**

- Install the shared React Native dependencies (`React Native CLI`, _not_ `Expo CLI`)

  - [macOS](https://facebook.github.io/react-native/docs/getting-started.html#installing-dependencies-1)
  - [Linux](https://facebook.github.io/react-native/docs/getting-started.html#installing-dependencies-2)

- Install [cocoapods](https://guides.cocoapods.org/using/getting-started.html) by running:

```bash
sudo gem install cocoapods
```

Install the required libraries and packages dependencies

```sh
npm install
cd ios && pod install && cd .. # install pods for iOS
```

If there are errors with the crypto library in React when install the npm install, is necessary to install node core shims and recursively with rn-nodeify:

```sh
./node_modules/.bin/rn-nodeify --hack --install
```



## Running

#### Android

- Install the Android SDK, via [Android Studio](https://developer.android.com/studio).

```sh
npm run android

```

This command starts the app in the device if you have it plugged or otherwise it launches an emulator.

#### iOS

- Install the iOS dependencies
  - [React Native Getting Started - iOS](https://facebook.github.io/react-native/docs/getting-started.html#installing-dependencies-1) _(React Native CLI Quickstart -> [your OS] -> iOS)_
    - You do **not** need CocoaPods

```sh
npm run ios

```

This command starts the app in the device if you have it plugged or otherwise it launches an emulator.

## Testing

Run the tests

```sh
npm run test
```

## License
