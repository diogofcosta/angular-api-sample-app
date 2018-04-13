This project is based off the angular-seed project that can be found at:

https://github.com/angular/angular-seed

Which is a great boilerplate to start a simple angular app.

Setup:

Since it's based on the angular-seed project most of the scripts to run are the same.

The more important ones are as follows:

### Install Dependencies

```
npm install
```

Behind the scenes this will also call `bower install`. After that, you should find out that you have
two new folders in your project.

* `node_modules` - contains the npm packages for the tools we need
* `app/bower_components` - contains the Angular framework files

*Note that the `bower_components` folder would normally be installed in the root folder but
`angular-seed` changes this location through the `.bowerrc` file. Putting it in the `app` folder
makes it easier to serve the files by a web server.*

### Running the app:

The project is preconfigured with a simple development web server. The simplest way to start this server is:

```
npm start
```

Now browse to the app at localhost:8000/index.html.


### Testing:

At the moment only a few Unit tests are implemented, the plan is with time and after learning a bit more about them to implement many more.

### Running Unit Tests

The `angular-seed` app comes preconfigured with unit tests. These are written in [Jasmine][jasmine],
which we run with the [Karma][karma] test runner. We provide a Karma configuration file to run them.

* The configuration is found at `karma.conf.js`.
* The unit tests are found on the folder `test\unit\*.js`

The easiest way to run the unit tests is to use the supplied npm script:

```
npm test
```

This script will start the Karma test runner to execute the unit tests. Moreover, Karma will start
watching the source and test files for changes and then re-run the tests whenever any of them
changes.
This is the recommended strategy; if your unit tests are being run every time you save a file then
you receive instant feedback on any changes that break the expected code functionality.

You can also ask Karma to do a single run of the tests and then exit. This is useful if you want to
check that a particular version of the code is operating as expected. The project contains a
predefined script to do this:

```
npm run test-single-run
```

