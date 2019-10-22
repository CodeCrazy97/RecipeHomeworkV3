import "./App.css";
import image1 from "./Peanut-Butter-Banana-Smoothie.jpg";
import image2 from "./Sardines-and-Saltines.jpg";
import React, { Component } from "react";

// Declare our two recipes in JSON format.
const recipes = [
  {
    image: image1,
    title: "Banana Peanut Smoothie",
    summary: "Yummy, easy, and smooth!",
    steps:
      "1. Put banana, peanut butter, milk and ice cream in blender. 2. Blend for 10 seconds. 3. Serve.",
    ingredients:
      "1 ripe banana, 1 Tbs of peanut butter, 3/4 cup of milk, 1 ice cube"
  },
  {
    image: image2,
    title: "Sardines & Saltines",
    summary: "Hearty & healthy",
    steps:
      "1. Open sardine can. 2. Place sardines, peanut butter, and garnish on whole wheat crackers. 3. Serve.",
    ingredients:
      "1 can of sardines, 8 whole wheat saltine crackers, peanut butter (optional), lemon slice (optional), and parsley (optional)"
  }
];

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

    this.state = { title: "", recipes };

    this.isClicked = false; // Determines if a recipe at homepage has been clicked.
    this.selectedIndex = -1; // Keeps track of which index into the recipes array was clicked.
    this.imageClick = this.imageClick.bind(this);
    this.previousButtonClick = this.previousButtonClick.bind(this);
    this.nextButtonClick = this.nextButtonClick.bind(this);
  }

  componentWillMount() {
    console.log("componentWillMount()");
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
        that.setState({ title: data[0].title });
      });
  }

  // Called when Previous button is clicked.
  previousButtonClick = oldIndex => {
    this.selectedIndex = displayOtherRecipe(oldIndex);
    this.setState({
      isClicked: this.isClicked,
      selectedIndex: this.selectedIndex
    });
  };

  // Called when Next button is clicked.
  nextButtonClick = oldIndex => {
    this.selectedIndex = displayOtherRecipe(oldIndex);
    this.setState({
      isClicked: this.isClicked,
      selectedIndex: this.selectedIndex
    });
  };

  // imageClick: called when a recipe picture, title, or summary is clicked
  // Will take user to page that displays the details of the recipe.
  imageClick = (index, wasClicked) => {
    this.isClicked = !wasClicked;
    this.selectedIndex = index;
    this.setState({
      isClicked: this.isClicked,
      selectedIndex: this.selectedIndex
    });
  };

  render() {
    console.log("render called. title = " + this.state.title);
    return !this.isClicked ? (
      // A recipe has NOT yet been clicked; display the homepage with overview of recipes (nothing has been clicked yet).
      <div class="page">
        {recipes.map((item, index) => (
          <div key={item.objectID}>
            <a
              style={{ cursor: "pointer" }}
              type="button"
              className="card-link"
              {...console.log("clicked=" + this.isClicked)}
              onClick={() => this.imageClick(index, this.isClicked)}
            >
              {this.state.isClicked ? true : false}
              <span>
                <img src={item.image} />
              </span>
              <span>
                <h2 id={item.title}>{item.title}</h2>
              </span>
              <span>
                <h4>{item.summary}</h4>
              </span>
              <br />
              <br />
            </a>
          </div>
        ))}
      </div>
    ) : (
      // A recipe has been clicked; display recipe details.
      <div id="page">
        <div key={recipes[this.selectedIndex].objectID}>
          <span>
            <img src={recipes[this.selectedIndex].image} />
          </span>
          <span>
            <h2>{recipes[this.selectedIndex].title}</h2>
          </span>
          <span>
            <h4>{recipes[this.selectedIndex].summary}</h4>
          </span>
          <span>
            <h4>
              <i>Ingredients: </i>
              {recipes[this.selectedIndex].ingredients}
            </h4>
          </span>
          <span>
            <h4>
              <i>Steps: </i>
              {recipes[this.selectedIndex].steps}
            </h4>
          </span>
          <div>
            <input
              style={{ cursor: "pointer" }}
              className="bottom-left-button"
              type="button"
              value="Previous"
              onClick={() => this.previousButtonClick(this.selectedIndex)}
            />
            <input
              style={{ cursor: "pointer" }}
              className="bottom-right-button"
              type="button"
              value="Next"
              onClick={() => this.nextButtonClick(this.selectedIndex)}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
