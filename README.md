
To start postgreSQL on MacBook:

>``brew services start postgresql``

To create database (config/database.yml for db name, pw):

>``rails db:create``

Now that the application is connected to a database, start the application by running the following command in you Terminal window:

    rails s --binding=127.0.0.1

Run the following command in your Terminal window to install these packages with the Yarn package manager:

    yarn add react-router-dom bootstrap jquery popper.js

Run the following command in your Terminal window to create a Homepage controller with an index action:

    rails g controller Homepage index

Inside this file, replace get 'homepage/index' with root 'homepage#index' so that the file looks like the following:

    root 'homepage#index'

This modification instructs Rails to map requests to the root of the application to the index action of the Homepage controller, which in turn renders whatever is in the index.html.erb file located at app/views/homepage/index.html.erb on to the browser.

To verify that this is working:

``rails s --binding=127.0.0.1``


Next, delete the contents of the ``~/rails_react_recipe/app/views/homepage/index.html.erb`` file. By doing this, you will ensure that the contents of index.html.erb do not interfere with the React rendering of your frontend.

First, rename the ``~/rails_react_recipe/app/javascript/packs/hello_react.jsx`` file to ``~/rails_react_recipe/app/javascript/packs/Index.jsx``.


Add the following highlighted lines of code at the end of the head tag in the application layout file:


`` <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<%= javascript_pack_tag 'Index' %>``

Adding the JavaScript pack to your application’s header makes all your JavaScript code available and executes the code in your Index.jsx file on the page whenever you run the app. Along with the JavaScript pack, you also added a meta viewport tag to control the dimensions and scaling of pages on your application.




**Source:**

- https://www.digitalocean.com/community/tutorials/how-to-set-up-a-ruby-on-rails-project-with-a-react-frontend