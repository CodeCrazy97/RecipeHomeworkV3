import "./App.css";
import React, { Component } from "react";

const PATH_BASE = "http://gtest.dev.wwbtc.com";
const JSON_EXTENSION = "/json/rec";

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

    this.state = { recipes: [{}], currentRecipe: null };
    this.selectedIndex = 0; // Keeps track of which index into the recipes array was clicked. Default is first recipe in the list.
    this.imageClick = this.imageClick.bind(this);
    this.previousButtonClick = this.previousButtonClick.bind(this);
    this.nextButtonClick = this.nextButtonClick.bind(this);
  }

  componentDidMount() {
    /*
    // ----------------------
    // Next few lines of code are for OFFLINE TESTING. Delete them before submitting the homework.
    const tempRecipes = [
      {
        title: "Tomato and olive focaccia (TM)",
        body:
          "\n<p> PREPARATION TIME :&nbsp;20<br>COOKING TIME :&nbsp;45<br> SERVES :&nbsp;TODO &lt;<br>DIFFICULTY: EASY<br></p>\n\n\n\n<p> Add the water and the flour to the bowl 30 sec / Speed 5.,Leave for 1 hour to autolyse.,Add the yeast and salt to separate sides of the bowl 10 seconds / Speed 7.,Then 2 minutes / Knead.,Remove the dough from the bowl and form a ball.,Place the dough into a bowl and pour olive oil over the dough to make sure it is well coated.,Cover and leave to rest overnight in the fridge.,The next day, remove from the fridge and bring to room temperature.,Pour enough olive oil to cover the base of a roasting pan about 20 x 30cm.,Put the dough in the centre of the pan and let it rest, covered, for 30 minutes.,Turn the dough in the oil (it must be nice and oily) and spread it with the tip of your fingers from the centre.,Sprinkle with tomatoes pieces or cherry tomatoes, cut in half and push well into the dough with the olives.,Sprinkle with oregano, salt and more oil.,Allow to rest until doubled in size.,Cook on the bottom rack of a preheated oven for 25 minutes at 200° C (400° F - gas 6), [fan oven 180° C],Allow to cool on a wire rack. </p>\n",
        field_images:
          "/sites/default/files/styles/medium/public/2019-10/542904-pxhere.jpg?itok=kKS71aFe, /sites/default/files/styles/medium/public/2019-10/vigo%20the%20cat%20wallpaper.jpg?itok=C7xZGmBE",
        view_node: "/node/8",
        field_ingredients:
          "ingredient 1, ingredient 2, ingredient 3, ingredient 4",
        field_summary:
          "baked flatbread type dish that is easy for even terrible cooks to make (now with 15% less housefire)<br />\r\n"
      },
      {
        title: "Majorcan vegetable bake",
        body:
          "\n<p> PREPARATION TIME : 15<br>  COOKING TIME : 25<br> SERVES : TODO &lt;<br> DIFFICULTY : EASY</p>\n\n\n\n<p> Add 1.5 tablespoons of the oil to a pan and sizzle the garlic for a minute and then add the tomatoes, oregano, season and simmer for 10 minutes to reduce a little.,Toss the aubergine, pepper and onion in the remaining oil, season and arrange in a baking tray and oven roast for 10 minutes.,Remove from the oven and arrange the potatoes and vegetables in layers.,Pour over the tomato sauce, add a grind of black pepper and a glug of olive oil.,Cover with tin foil and bake for 1 hour, removing the tin-foil half way through.<br></p>\n",
        field_images:
          "/sites/default/files/styles/medium/public/2019-10/img_9212-683x1024.jpg?itok=yDqHlTFF",
        view_node: "/node/7",
        field_ingredients:
          "400g can peeled plum tomatoes - chopped, 1 tablespoon fresh oregano or marjoram - chopped, 3 tablespoon olive oil plus a little more to dress the dish with, 6 fat Cloves of garlic (or to taste), half peeled and crushed, the remaining half peeled and roughly chopped, 1 aubergine, 1 sweet bell pepper of any colour, 1 large onion, peeled and sliced, 650g potatoes, sea salt and freshly ground black pepper",
        field_summary: ""
      }
    ];

    this.setState({ recipes: tempRecipes });
    // ----------------------
    */

    const url = "".concat(PATH_BASE, JSON_EXTENSION);
    /*
    const that = this;
    

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
      */

    console.log("componentDidMount");
    fetch(url)
      .then(response => response.json())
      .then(data => this.setState({ recipes: data }));
  }

  // Called when Previous button is clicked.
  previousButtonClick = oldIndex => {
    this.selectedIndex = displayOtherRecipe(oldIndex);

    // Set the currently viewed recipe to the one that was clicked.
    this.setState({});
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
      <div>
        // A recipe has NOT yet been clicked; display the homepage with overview
        of recipes (nothing has been clicked yet).
        <div className="split left">
          {this.state.recipes && (
            <RecipeCollection
              list={this.state.recipes}
              imageClick={this.imageClick}
            />
          )}
        </div>
        <Recipe index={this.selectedIndex} state={this.state} />
      </div>
    );
  }
}

// createMarkup: returns the data in HTML format. Used with JSON that contains HTML elements.
// data - the JSON text that (may) contain HTML elements.
function createMarkup(data) {
  return { __html: data };
}

const Recipe = ({ index, state }) => (
  <div className="split right">
    <span>
      {console.log("field images : " + state.recipes[index].field_images)}
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
  </div>
);

const RecipeCollection = ({ list, imageClick }) => (
  <div>
    {list.map((item, index) => (
      <div key={item.objectID}>
        <a
          style={{ cursor: "pointer" }}
          type="button"
          className="card-link"
          onClick={() => imageClick(index)}
        >
          <span>
            <img src={PATH_BASE + item.field_images} />
          </span>
          <span>
            <h1> {item.title} </h1>
          </span>
          <span>
            <h3 dangerouslySetInnerHTML={createMarkup(item.field_summary)} />
          </span>
        </a>
        <br />
      </div>
    ))}
  </div>
);

export default App;
