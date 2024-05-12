//@@viewOn:imports
import { Utils, createVisualComponent, useRoute } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import { withRoute } from "uu_plus4u5g02-app";

import Config from "./config/config.js";
import Header from "../bricks/header.js";
import { Grid, Tile, Text } from "uu5g05-elements";
import { Image } from "uu5imagingg01";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

let RecipeBook = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "RecipeBook",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const [, setRoute] = useRoute();

    function CustomTile(props) {
      return (
        <div style={{ paddingTop: "5%" }}>
          <Tile
            onClick={() => setRoute(props.route)}
            borderRadius="expressive"
            header={
              <Grid justifyItems="center">
                <Text category="expose" segment="default" type="hero" autoFit={true}>
                  {props.headerText}
                </Text>
              </Grid>
            }
          >
            <Image lightbox={false} height="420px" width="100%" src={props.img} />
          </Tile>
        </div>
      );
    }

    const images = {
      recipeBook:
        "https://media.istockphoto.com/id/1304880229/photo/baking-and-cooking-ingredients-and-blank-recipe-book.jpg?s=1024x1024&w=is&k=20&c=SqNMCK8lg3QMNtk9KhfrvD9vYI1uVRKq8glLf7i1JYU=",
      dailyPlanner:
        "https://media.istockphoto.com/id/1130220091/photo/human-hand-filling-meal-plan-in-notebook.jpg?s=1024x1024&w=is&k=20&c=WUHfiXoARD8fpb9b-qoVPup3hw9akdYik-i1JJGVLJM=",
      shoppingList:
        "https://media.istockphoto.com/id/1420591198/photo/budget-planning-making-shopping-list-and-managing-household-expenses-to-save-money-financial.jpg?s=1024x1024&w=is&k=20&c=-npPhasyPVglRZYU5eilxUiuCWHUrDdRthYeTbVOrpM=",
    };
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return <div style={{ paddingTop: "5vh", paddingBottom: "5vh" }}></div>;
    //@@viewOff:render
  },
});

RecipeBook = withRoute(RecipeBook, { authenticated: true });

//@@viewOn:exports
export { RecipeBook };
export default RecipeBook;
//@@viewOff:exports
