# Magic Web

[![Banner](banner.png)](https://soyguijarro.github.io/magic-web/)

Magic Web is a web app that helps you discover all the amazing things your browser can do. It features a series of small demos that showcase different standard [Web APIs](https://developer.mozilla.org/en-US/docs/WebAPI), both present and future. The idea is that people, particularly developers, can try a bunch of these Web APIs in a single place to get a sense of what's possible, and even take a look at the code in this repository to see how they can use them.


## Technology

The web app is build with [React](https://facebook.github.io/react/). Styles are written in plain CSS and automatically prefixed with [Autoprefixer](https://github.com/postcss/autoprefixer). [Babel](http://babeljs.io/) is used for transpiling and [Webpack](https://webpack.github.io/) for module bundling. [Create React App](https://github.com/facebookincubator/create-react-app) was used to take care of all this tooling. All routing is handled client-side with [React Router](https://reacttraining.com/react-router/) and service worker code for offline support is automatically generated with [sw-precache](https://github.com/GoogleChrome/sw-precache). The site is hosted in [GitHub Pages](https://pages.github.com/) and deployed with [gh-pages](https://github.com/tschaub/gh-pages)'s command line utility through a simple npm script.

A number of Web APIs are showcased and hence used within the app, from well-established to cutting edge ones, such as [Geolocation](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation), [Media Devices](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices), [Notifications](https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API), [Web Speech](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API), [Web Bluetooth](https://developers.google.com/web/updates/2015/07/interact-with-ble-devices-on-the-web), [Payment Request](https://developer.mozilla.org/en-US/docs/Web/API/Payment_Request_API) and others. Every demo in the app lists all the Web APIs that are involved below its title. All code directly related to Web APIs is isolated in different modules inside the `helpers` folder, so that you need to know nothing but plain JavaScript to take a look at it.


## Motivation

The project started as a consequence of me submitting a talk proposal to [Front Fest 2017](http://frontfest.es/). I had recently watched [this talk on Web Bluetooth from the Chrome Dev Summit 2015](https://www.youtube.com/watch?v=_BUwOBdLjzQ) and had been blown away by it. I had also recently read about the [Payment Request API](https://developer.mozilla.org/en-US/docs/Web/API/Payment_Request_API), so I thought a good idea for a talk would be to showcase some of these new, less-known capabilities of the web platform. My proposal was accepted and it was then when I thought that I'd be much more interesting and impactful to turn my talk into a live demo in the form of a web app that the audience could later peruse on their own.


## Acknowledgments

The design of the web app tries to follow the [Material design](https://material.google.com/) guidelines. The icons used throughout the app are in fact part of the [Material icon set](https://material.io/icons/) and [Roboto](https://fonts.google.com/specimen/Roboto) is used as the only typeface. The name and primary color of the web app are inspired by [this GIF](http://giphy.com/gifs/shia-labeouf-12NUbkX6p4xOO4), which is the image that came to mind when I first learned about some of the newest Web APIs.


The [Create React PWA](https://github.com/jeffposnick/create-react-pwa) repository was of great help to turn the React app built with [Create React App](https://github.com/facebookincubator/create-react-app) into a progressive web app. Also of great help was [Single Page Apps for GitHub Pages](https://github.com/rafrex/spa-github-pages), to make client-side routing with React Router work with GitHub Pages.


## License and issues

The source code of the web app is released under the MIT License. The full text of the license is available in the [LICENSE file](LICENSE). If you find any errors or have suggestions for this project, please [open an issue](https://github.com/soyguijarro/magic-web/issues) and I'll do my best to help.
