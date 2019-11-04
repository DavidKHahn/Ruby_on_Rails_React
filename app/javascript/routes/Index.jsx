import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import NewRecipe from "../components/NewRecipe";
import Recipe from "../components/Recipe";
import Recipes from "../components/Recipes";

export default (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/recipes" exact component={Recipes} />
      <Route path="/recipe/:id" exact component={Recipe} />
      <Route path="/recipe" exact component={NewRecipe} />
    </Switch>
  </Router>
);