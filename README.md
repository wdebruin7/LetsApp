# Let's!

## Project Setup

Follow instructions at [Setting up the Development Environment](https://reactnative.dev/docs/environment-setup "Setting up the development environment") to set up iOS and Android emulators. Follow instructions for 'React Native CLI Quickstart.'

### Installing Dependencies

From top level project directory, run the following commands to install node modules and cocoapods.

```
npm install
```

```
cd ios && pod install
```

You should now be able to run the project on an emulator or physical device. 

* Run on physical iOS device (See [Running on Device](https://reactnative.dev/docs/running-on-device "Running on Device") )

* Run on iOS emulator via ```npx react-native run-ios```

* Run on Android emulator via ```npx react-native run-android```

## Troubleshooting

If shit goes FUBAR when trying to build the project, try removing and reinstalling dependencies.

From top level project directory, execute the following:

```
rm -rf node_modules && cd ios && rm -rf pods && rm Podfile.lock && cd .. && npm install && cd ios && pod install
```
