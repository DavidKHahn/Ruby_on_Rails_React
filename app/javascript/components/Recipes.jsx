import React from "react";

class Recipes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: []
    };
  }


  componentDidMount() {
    const url = "/api/v1/recipes/index";
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ recipes: response }))
      .catch(() => this.props.history.push("/"));
}

}
export default Recipes;