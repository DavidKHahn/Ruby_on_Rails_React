
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

Start by creating a Recipe model by using the generate model subcommand provided by Rails and by specifying the name of the model along with its columns and data types. Run the following command in your Terminal window to create a Recipe model:

    rails generate model Recipe name:string ingredients:text instruction:text image:string

The preceding command instructs Rails to create a Recipe model together with a name column of type string, an ingredients and instruction column of type text, and an image column of type string. This tutorial has named the model Recipe, because by convention models in Rails use a singular name while their corresponding database tables use a plural name.

Running the generate model command creates two files:

A `recipe.rb` file that holds all the model related logic.
A `20190407161357_create_recipes.rb` file (the number at the beginning of the file may differ depending on the date when you run the command). This is a migration file that contains the instruction for creating the database structure.



**Source:**

- https://www.digitalocean.com/community/tutorials/how-to-set-up-a-ruby-on-rails-project-with-a-react-frontend