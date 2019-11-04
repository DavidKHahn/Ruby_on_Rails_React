
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

Add the following highlighted lines of code to the recipes controller:

    def index
    recipe = Recipe.all.order(created_at: :desc)
    render json: recipe

In your index action, using the all method provided by ActiveRecord, you get all the recipes in your database. Using the order method, you order them in descending order by their created date. This way, you have the newest recipes first. Lastly, you send your list of recipes as a JSON response with render.

Next, add the logic for creating new recipes. As with fetching all recipes, you’ll rely on ActiveRecord to validate and save the provided recipe details. Update your recipe controller with the following highlighted lines of code:

    def create
        recipe = Recipe.create!(recipe_params)
        if recipe
        render json: recipe
        else
        render json: recipe.errors
        end

    ...
    def destroy
    end

    private

    def recipe_params
        params.permit(:name, :image, :ingredients, :instruction)
    end
    end

In the create action, you use ActiveRecord’s create method to create a new recipe. The create method has the ability to assign all controller parameters provided into the model at once. This makes it easy to create records, but also opens the possibility of malicious use. This can be prevented by using a feature provided by Rails known as strong parameters. This way, parameters can’t be assigned unless they’ve been whitelisted. In your code, you passed a recipe_params parameter to the create method. The recipe_params is a private method where you whitelisted your controller parameters to prevent wrong or malicious content from getting into your database. In this case, you are permitting a name, image, ingredients, and instruction parameter for valid use of the create method.

Your recipe controller can now read and create recipes. All that’s left is the logic for reading and deleting a single recipe. Update your recipes controller with the following code:

    ...
    def show
    if recipe
      render json: recipe
    else
      render json: recipe.errors
    end
    end

    ...
    def destroy
    recipe&.destroy
    render json: { message: 'Recipe deleted!' }
    end

    ...
      end

    def recipe
        @recipe ||= Recipe.find(params[:id])
    end
    end

In the new lines of code, you created a private recipe method. The recipe method uses ActiveRecord’s find method to find a recipe whose idmatches the id provided in the params and assigns it to an instance variable @recipe. In the show action, you checked if a recipe is returned by the recipe method and sent it as a JSON response, or sent an error if it was not.

In the destroy action, you did something similar using Ruby’s safe navigation operator &., which avoids nil errors when calling a method. This let’s you delete a recipe only if it exists, then send a message as a response.


    9.times do |i|
    Recipe.create(
    name: "Recipe #{i + 1}",
    ingredients: '227g tub clotted cream, 25g butter, 1 tsp cornflour,100g parmesan, grated nutmeg, 250g fresh fettuccine or tagliatelle, snipped chives or chopped parsley to serve (optional)',
    instruction: 'In a medium saucepan, stir the clotted cream, butter, and cornflour over a low-ish heat and bring to a low simmer. Turn off the heat and keep warm.'
    )
    end

In this code, you are using a loop to instruct Rails to create nine recipes with a name, ingredients, and instruction.
To seed the database with this data, run the following command in your Terminal window:

``rails db:seed``

Running this command adds nine recipes to your database. Now you can fetch them and render them on the frontend.

The component to view all recipes will make a HTTP request to the index action in the RecipesController to get a list of all recipes. These recipes will then be displayed in cards on the page.

**REACT COMPONENTS:**

In your componentDidMount method, you made an HTTP call to fetch all recipes using the Fetch API. If the response is successful, the application saves the array of recipes to the recipe state. If there’s an error, it will redirect the user to the homepage.

Finally, add a render method in the Recipe class. The render method holds the React elements that will be evaluated and displayed on the browser page when a component is rendered. In this case, the render method will render cards of recipes from the component state. Add the following highlighted lines to Recipes.jsx: (GITHUB [master 22107e3] react feature).

RUN THE SERVER AGAIN TO CHECK ON CLIENT SIDE CODE:

``rails s --binding=127.0.0.1``

Like with your Recipes component, in the constructor, you initialized a state object that holds the state of a recipe. You also bound an addHtmlEntities method to this so it can be accessible within the component. The addHtmlEntities method will be used to replace character entities with HTML entities in the component.

In order to find a particular recipe, your application needs the id of the recipe. This means your Recipe component expects an id param. You can access this via the props passed into the component.

Next, add a componentDidMount method where you will access the id param from the match key of the props object. Once you get the id, you will then make an HTTP request to fetch the recipe.

In the componentDidMount method, using object destructuring, you get the id param from the props object, then using the Fetch API, you make a HTTP request to fetch the recipe that owns the id and save it to the component state using the setState method. If the recipe does not exist, the app redirects the user to the recipes page.

Now add the addHtmlEntities method, which takes a string and replaces all escaped opening and closing brackets with their HTML entities.

Finally, add a render method that gets the recipe from the state and renders it on the page. In this render method, you split your comma separated ingredients into an array and mapped over it, creating a list of ingredients. If there are no ingredients, the app displays a message that says No ingredients available. It also displays the recipe image as a hero image, adds a delete recipe button next to the recipe instruction, and adds a button that links back to the recipes page:

    import React from "react";
import { Link } from "react-router-dom";

class Recipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = { recipe: { ingredients: "" } };

    this.addHtmlEntities = this.addHtmlEntities.bind(this);
  }

  componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props;

    const url = `/api/v1/show/${id}`;

    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ recipe: response }))
      .catch(() => this.props.history.push("/recipes"));
  }

  addHtmlEntities(str) {
    return String(str)
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">");
  }

  render() {
    const { recipe } = this.state;
    let ingredientList = "No ingredients available";

    if (recipe.ingredients.length > 0) {
      ingredientList = recipe.ingredients
        .split(",")
        .map((ingredient, index) => (
          <li key={index} className="list-group-item">
            {ingredient}
          </li>
        ));
    }
    const recipeInstruction = this.addHtmlEntities(recipe.instruction);

    return (
      <div className="">
        <div className="hero position-relative d-flex align-items-center justify-content-center">
          <img
            src={recipe.image}
            alt={`${recipe.name} image`}
            className="img-fluid position-absolute"
          />
          <div className="overlay bg-dark position-absolute" />
          <h1 className="display-4 position-relative text-white">
            {recipe.name}
          </h1>
        </div>
        <div className="container py-5">
          <div className="row">
            <div className="col-sm-12 col-lg-3">
              <ul className="list-group">
                <h5 className="mb-2">Ingredients</h5>
                {ingredientList}
              </ul>
            </div>
            <div className="col-sm-12 col-lg-7">
              <h5 className="mb-2">Preparation Instructions</h5>
              <div
                dangerouslySetInnerHTML={{
                  __html: `${recipeInstruction}`
                }}
              />
            </div>
            <div className="col-sm-12 col-lg-2">
              <button type="button" className="btn btn-danger">
                Delete Recipe
              </button>
            </div>
          </div>
          <Link to="/recipes" className="btn btn-link">
            Back to recipes
          </Link>
        </div>
      </div>
    );
    }

    }

export default Recipe;




**Source:**

- https://www.digitalocean.com/community/tutorials/how-to-set-up-a-ruby-on-rails-project-with-a-react-frontend