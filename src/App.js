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
        that.setState({ recipes: data });
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
      <div className="page">
        <div className="interactions">
          {this.state.recipes && (
            <RecipeCollection list={this.state.recipes} imageClick={this.imageClick} />
          )}
        </div>
      </div>
    ) : ( 
      {...console.log("Do nothing.")}
    );
  }
}

const RecipeCollection = ({ list, imageClick }) => (
  <div className="table">
    {list.map(item => (
      <div key={item.objectID} className="table-row">
        <a
          style={{ cursor: "pointer" }}
          type="button"
          className="card-link"
          {...console.log("CLICKED!!!")}
          onClick={() => imageClick(0, this.isClicked)}
        >
          <span style={{ width: "30%" }}> {item.title} </span>
          <span style={{ width: "10%" }}> {item.body} </span>
          <span style={{ width: "10%" }}> {item.summary} </span>
        </a>
      </div>
    ))}
  </div>
);

export default App;
