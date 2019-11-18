import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import App, {
  previousButtonClick,
  nextButtonClick,
  imageClick,
  displayOtherRecipe,
  Recipe,
  RecipeCollection
} from "./App";
import Adapter from "enzyme-adapter-react-16";
import { Enzyme, render, mount, shallow, configure } from "enzyme";
import { URL } from "url";
import { stat } from "fs";

const props = {
  index: 0,
  state: {
    recipes: [
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
    ]
  }
};

configure({ adapter: new Adapter() });

describe("recipe homework", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
  });

  test("matches the snapshot", () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  // The RecipeCollection component will render, as the recipes list contains data.
  it("contains split-left component", () => {
    const element = render(<RecipeCollection list={props.state.recipes} />);
    expect(element.hasClass("split-left"));
  });

  // The RecipeCollection component won't render, as the recipes list is empty.
  it("does not contain split-left component", () => {
    const element = render(<RecipeCollection list={props.state.recipes} />);
    expect(!element.hasClass("split-left"));
  });

  it("returns index of first recipe", () => {
    expect(displayOtherRecipe(3, 4, false)).toEqual(0);
  });

  it("returns index of last recipe", () => {
    expect(displayOtherRecipe(0, 6, true)).toEqual(5);
  });

  it("returns index of next recipe", () => {
    expect(displayOtherRecipe(2, 4, false)).toEqual(3);
  });

  it("returns index of previous recipe", () => {
    expect(displayOtherRecipe(3, 6, true)).toEqual(2);
  });

  it("test click event", () => {
    const mockCallBack = jest.fn();

    const button = shallow(
      <Recipe index={0} state={(props.state.recipes, mockCallBack)}>
        Previous
      </Recipe>
    );
    button.find("bottom-left-button").simulate("click");
    expect(mockCallBack.mock.calls.length).toEqual(1);
  });
});
