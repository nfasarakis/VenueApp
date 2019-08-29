# React Native Venue App Front End Demo

![](http://nfasarakis.com/GitHub_images/git_Venue.jpg)

React Native Venue App - Front End

The Venue App logs & shares near-real time data about how many people are at a given "Venue" while also notifying users about any offers available. That data is crowdsourced directly by all users of the app.

## Setup

1. Install react-navigation in project folder

```
yarn add react-navigation
```

2. Install react-native-gesture-handler in project folder

```
yarn add react-native-gesture-handler
```

3. Install react-native-linear-gradient in project folder

```
yarn add react-native-linear-gradient
```

4. Install react-native-maps in project folder

```
yarn add react-native-maps -E
```

See detailed react-native-maps [Installation Instructions](https://github.com/react-native-community/react-native-maps/blob/master/docs/installation.md).


4. (Auto)linking of packages

```
cd ios && pod install && cd.. # iOS needs this extra step
```

> **WARNING**: Autolinking available in React Native 0.60 and higher! If using a lower version of React Native you'll need to link native dependencies with -link

See [Autolinking](https://github.com/react-native-community/cli/blob/master/docs/autolinking.md) for more information
