# HackNews

## Requirements
Setup [React Native](https://reactnative.dev/docs/environment-setup) environtment
 

## Clone the repo
Open Terminal App and run `git` command

###### using SSH
 
```bash
$ git clone git@github.com:hhtcamigla/HackNews.git
```
###### using HTTPS

```bash
$ git clone https://github.com/hhtcamigla/HackNews.git
```

## iOS Setup
Open Terminal App and navigate to the project's root folder and run `yarn` or `npm install` to install the necessary module libraries

###### yarn
 
```bash
$ yarn
```
###### npm

```bash
$ npm install
```
Install the pod libraries

```bash
$ cd ios
$ pod install
```

## Android Setup
Create a `local.properties` inside `/android` folder and set the `sdk.dir` to Android SDK location

```bash
sdk.dir=/Users/USER_NAME/Library/Android/sdk
```

Change `USER_NAME` according to your credential name
>**_NOTE:_**  Please do not checkin `local.properties` file to github repo


## Launch the app
###### iOS
```
$ npm run ios
```
###### Android
```
$ npm run android
```

>**_NOTE:_**  `npm start` will be called if metro server is not yet running

## Screens

View the [iOS](https://github.com/hhtcamigla/HackNews/blob/main/screenshots/ios.png?raw=true) and [android](https://github.com/hhtcamigla/HackNews/blob/main/screenshots/android.jpg?raw=true) screens 


---
