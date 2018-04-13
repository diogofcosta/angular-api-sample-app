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

