
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

Add the following highlighted lines of code to the file:

    validates :name, presence: true
    validates :ingredients, presence: true
    validates :instruction, presence: true

In this code, you added model validation which checks for the presence of a name, ingredients, and instruction field. Without the presence of these three fields, a recipe is invalid and won’t be saved to the database.

For Rails to create the recipes table in your database, you have to run a migration, which in Rails is a way to make changes to your database programmatically. To make sure that the migration works with the database you set up, it is necessary to make changes to the `20190407161357_create_recipes.rb` file.

Add the following highlighted lines, so that the file looks like this:

    t.string :name, null: false
    t.text :ingredients, null: false
    t.text :instruction, null: false
    t.string :image, default: 'https://raw.githubusercontent.com/do-community/react_rails_recipe/master/app/assets/images/Sammy_Meal.jpg'

This migration file contains a Ruby class with a change method, and a command to create a table called recipes along with the columns and their data types. You also updated 20190407161357_create_recipes.rb with a NOT NULL constraint on the name, ingredients, and instruction columns by adding null: false, ensuring that these columns have a value before changing the database. Finally, you added a default image URL for your image column; this could be another URL if you wanted to use a different image.

With these changes, save and exit the file. You’re now ready to run your migration and actually create your table. In your Terminal window, run the following command:

    rails db:migrate

With your recipe model in place, create your recipes controller and add the logic for creating, reading, and deleting recipes. In your Terminal window, run the following command:

    rails generate controller api/v1/Recipes index create show destroy -j=false -y=false --skip-template-engine --no-helper

In this command, you created a Recipes controller in an api/v1 directory with an index, create, show, and destroy action. The index action will handle fetching all your recipes, the create action will be responsible for creating new recipes, the show action will fetch a single recipe, and the destroy action will hold the logic for deleting a recipe.

You also passed some flags to make the controller more lightweight, including:

- -j=false which instructs Rails to skip generating associated JavaScript files.
- -y=false which instructs Rails to skip generating associated stylesheet files.
- --skip-template-engine, which instructs Rails to skip generating Rails view files, since React is handling your front-end needs.
- --no-helper, which instructs Rails to skip generating a helper file for your controller.

Running the command also updated your routes file with a route for each action in the Recipes controller. To use these routes, make changes to your config/routes.rb file.

        post 'recipes/create'
        get '/show/:id', to: 'recipes#show'
        delete '/destroy/:id', to: 'recipes#destroy'
        ...
    end
    root 'homepage#index'
    get '/*path' => 'homepage#index'

In this route file, you modified the HTTP verb of the create and destroy routes so that it can post and delete data. You also modified the routes for the show and destroy action by adding an :id parameter into the route. :id will hold the identification number of the recipe you want to read or delete.

You also added a catch all route with get '/*path' that will direct any other request that doesn’t match the existing routes to the index action of the homepage controller. This way, the routing on the frontend will handle requests that are not related to creating, reading, or deleting recipes.

To see a list of routes available in your application, run the following command in your Terminal window:

    rails routes






**Source:**

- https://www.digitalocean.com/community/tutorials/how-to-set-up-a-ruby-on-rails-project-with-a-react-frontend