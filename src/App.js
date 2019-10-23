import "./App.css";
import React, { Component } from "react";

// Called when Previous or Next buttons is clicked. Determines which recipe to display next.
function displayOtherRecipe(index) {
  if (index == 0) {
    return 1;
  } else {
    return 0;
  }
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { title: "", recipes: null };
    this.selectedIndex = -1; // Keeps track of which index into the recipes array was clicked.
    this.imageClick = this.imageClick.bind(this);
    this.previousButtonClick = this.previousButtonClick.bind(this);
    this.nextButtonClick = this.nextButtonClick.bind(this);
  }

  componentWillMount() {
    const that = this;
    const url = "http://gtest.dev.wwbtc.com/json/rec";

    fetch(url)
      .then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then(function(data) {
        that.setState({ recipes: data });
      });
  }

  // Called when Previous button is clicked.
  previousButtonClick = oldIndex => {
    this.selectedIndex = displayOtherRecipe(oldIndex);
    this.setState({
      selectedIndex: this.selectedIndex
    });
  };

  // Called when Next button is clicked.
  nextButtonClick = oldIndex => {
    this.selectedIndex = displayOtherRecipe(oldIndex);
    this.setState({
      selectedIndex: this.selectedIndex
    });
  };

  // imageClick: called when a recipe picture, title, or summary is clicked
  // Will take user to page that displays the details of the recipe.
  imageClick = (index, wasClicked) => {
    console.log("Clicked index = " + index);
    this.selectedIndex = index;
    this.setState({
      selectedIndex: this.selectedIndex
    });
  };

  render() {
    return (
      // A recipe has NOT yet been clicked; display the homepage with overview of recipes (nothing has been clicked yet).
      <div className="page">
        <div className="interactions">
          {this.state.recipes && (
            <RecipeCollection
              list={this.state.recipes}
              imageClick={this.imageClick}
            />
          )}
        </div>
      </div>
    );
  }
}

const RecipeCollection = ({ list, imageClick }) => (
  <div class="page-left">
    {list.map((item, index) => (
      <div key={item.objectID}>
        <a
          style={{ cursor: "pointer" }}
          type="button"
          className="card-link"
          onClick={() => imageClick(index)}
        >
          <span>
            <img src={item.field_images} />
          </span>
          <span>
            <h1> {item.title} </h1>
          </span>
          <span>
            <h2> {item.body} </h2>
          </span>
          <span>
            <h3> {item.summary} </h3>
          </span>
        </a>
      </div>
    ))}
  </div>
);

export default App;
