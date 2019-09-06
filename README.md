# React Native Venue App Front End Demo

![](http://nfasarakis.com/GitHub_images/git_Venue.jpg)

React Native Venue App - Front End

The Venue App logs & shares near-real time data about how many people are at a given "Venue" while also notifying users about any offers available. That data is crowdsourced directly by all users of the app.

## Setup

1. Follow the instruction in [the getting started page of the docs](https://facebook.github.io/react-native/docs/getting-started) to install all needed dependencies and react-native command-line tools

> **WARNING**: This project uses yarn as the default package manager. Find out more [here](https://code.fb.com/web/yarn-a-new-package-manager-for-javascript/)

2. Clone the project

```
git clone https://github.com/nfasarakis/VenueApp.git
```

3. Install the dependencies specified in the lock file

```
cd ./VenueApp && yarn
```

This will install
* [react-navigation](https://github.com/react-navigation/react-navigation)
* [react-native-linear-gradient](https://github.com/react-native-community/react-native-linear-gradient)
* [react-native-maps](https://github.com/react-native-community/react-native-maps)  


4. (Auto)link any native dependencies

```
cd ios && pod install && cd .. # iOS needs this extra step
```

> **WARNING**: Autolinking available in React Native 0.60 and higher! If using a lower version of React Native you'll need to link native dependencies with -link

See [Autolinking](https://github.com/react-native-community/cli/blob/master/docs/autolinking.md) for more information

5. Run the project (see instructions in the [react-native-docs](https://facebook.github.io/react-native/docs/getting-started))

```
react-native run-ios
```
or
```
react-native run-android
```
