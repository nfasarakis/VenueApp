# React Native Venue App Front End Demo (iOS)

![](http://nfasarakis.com/GitHub_images/git_Venue.jpg)

The Venue App logs & shares near-real time data about how many people are at a given "Venue" while also notifying users about any offers available. That data is crowdsourced directly by all users of the app.

## So... before you clone.

A word of caution. This repo is used to test & learn new features and does NOT include any backend logic. Some sample data is included locally but none of it comes from my servers (or Google's servers). It doesnt include any data logging or the location tracking. Think of it as a playground for front-end prototyping & testing. As such, it's updated frequently as I learn to incorporate newer react/react-native features. 

For instance, I'm currently updating the project with functional components [w/ Hooks](https://reactjs.org/docs/hooks-reference.html) and using the newest [Hook APIs of redux](https://react-redux.js.org/api/hooks), [navigation hooks](https://github.com/react-navigation/hooks), trying out MobX etc. Some of these features are still in BETA, others are new to me and all may change/break the code.   

> **WARNING**: This project uses [react-native-maps](https://github.com/react-native-community/react-native-maps). Maps don't
play nice with the iOS simulator. Currently addressing this.

### Want the full project (backend logic included)?

Let me know. I'll add it sometime in the future when I feel comfortable with it. It's not 100% ready yet. It includes logins, data logging, location tracking. Some of the logged data is fed to a recommender system. It get messy and changes some front-end functionality substantially. It's still very much in BETA.

When I've ironed out the details I'll share it with you. In the meantime, feel free to ask me questions :)  

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
* [redux](https://github.com/reduxjs/redux/)
* [react-redux](https://github.com/reduxjs/react-redux)
* [redux-thunk](https://github.com/reduxjs/redux-thunk)


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
