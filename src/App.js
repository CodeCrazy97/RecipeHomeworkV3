import "./App.css";
import React, { Component } from "react";

const PATH_BASE = "http://gtest.dev.wwbtc.com";
const JSON_EXTENSION = "/json/rec";

// displayOtherRecipe: called when Previous or Next buttons is clicked. Determines which recipe to display next.
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

    this.state = {
      indexTest: 0,
      recipes: [{}],
      imageClick: this.imageClick,
      previousButtonClick: this.previousButtonClick,
      nextButtonClick: this.nextButtonClick
    };

    this.selectedIndex = 0; // Keeps track of which index into the recipes array was clicked. Default is first recipe in the list.
    this.imageClick = this.imageClick.bind(this);
    this.previousButtonClick = this.previousButtonClick.bind(this);
    this.nextButtonClick = this.nextButtonClick.bind(this);
  }

  componentDidMount() {
    const url = "".concat(PATH_BASE, JSON_EXTENSION);

    fetch(url)
      .then(response => response.json())
      .then(data => this.setState({ recipes: data }));
  }

  // Called when Previous button is clicked.
  previousButtonClick = oldIndex => {
    this.selectedIndex = displayOtherRecipe(oldIndex);

    // Set the currently viewed recipe to the one that was clicked.
    this.setState({ selectedIndex: this.selectedIndex });
  };

  // Called when Next button is clicked.
  nextButtonClick = oldIndex => {
    this.selectedIndex = displayOtherRecipe(oldIndex);
    this.setState({ selectedIndex: this.selectedIndex });
  };

  // imageClick: called when a recipe picture, title, or summary is clicked
  // Will take user to page that displays the details of the recipe.
  imageClick = index => {
    this.selectedIndex = index;
    this.setState({ selectedIndex: this.selectedIndex });
  };

  render() {
    console.log(process.env.REACT_APP_DOC_TITLE);

    const numberOfRecipes = Object.keys(this.state.recipes[0]).length;
    let rc;
    if (numberOfRecipes > 0) {
      rc = (
        <div>
          <RecipeCollection list={this.state.recipes} state={this.state} />
          <Recipe index={this.selectedIndex} state={this.state} />
        </div>
      );
    } else {
      rc = (
        <div className="empty-recipes-message">
          There are no recipes to view! <br />
          You may not be connected to the Internet.
        </div>
      );
    }
   
  return <div>{rc}{console.log(process.env.REACT_APP_DOC_TITLE)}</div>;
  }
}

// createMarkup: returns the data in HTML format. Used with JSON that contains HTML elements.
// data - the JSON text that (may) contain HTML elements.
function createMarkup(data) {
  return { __html: data };
}

// Recipe: shows details about the first recipe in the list or a recipe that has been clicked on.
const Recipe = ({ index, state }) => (
  <div className="split-right">
    {console.log("state.indexTest : " + state.indexTest)}
    <span>
      <img src={PATH_BASE + state.recipes[index].field_images} />
    </span>
    <span>
      <h1> {state.recipes[index].title} </h1>
    </span>
    <span>
      <h2> Ingredients: {state.recipes[index].field_ingredients} </h2>
    </span>
    <span>
      <h3 dangerouslySetInnerHTML={createMarkup(state.recipes[index].body)} />
    </span>
    <span>
      <input
        className="bottom-left-button"
        type="button"
        value="Previous"
        onClick={() => state.previousButtonClick(index)}
      />
      <input
        className="bottom-right-button"
        type="button"
        value="Next"
        onClick={() => state.nextButtonClick(index)}
      />
    </span>
  </div>
);

// RecipeCollection: displays a brief summary of the recipes on the left-hand side of the screen.
const RecipeCollection = ({ list, state }) => (
  <div className="split-left">
    {list.map((item, index) => (
      <div key={item.objectID}>
        <a
          style={{ cursor: "pointer" }}
          type="button"
          className="card-link"
          onClick={() => state.imageClick(index)}
        >
          <span>
            <img class="small-image" src={PATH_BASE + item.field_images} />
          </span>
          <span class="text-right">
            <h3> {item.title} </h3>
            <h4 dangerouslySetInnerHTML={createMarkup(item.field_summary)} />
          </span>
        </a>
        <br />
        <br />
      </div>
    ))}
  </div>
);

export default App;

export { App, Recipe, RecipeCollection };
