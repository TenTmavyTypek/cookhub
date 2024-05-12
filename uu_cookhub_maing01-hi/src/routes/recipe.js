//@@viewOn:imports
import { createVisualComponent, useRoute } from "uu5g05";
import { withRoute } from "uu_plus4u5g02-app";
import { Box, Grid, Tile, Text, Modal } from "uu5g05-elements";

import Config from "./config/config.js";
import { GridTemplate } from "uu5g05-elements";
import RecipeProvider from "../bricks/recipe-book/recipe-provider.js";
import ContentHeader from "../bricks/content-header.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

let Recipe = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Recipe",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    console.log("properties", props);
    //@@viewOn:private
    const data = props.params;
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <GridTemplate
        contentMap={{
          header: <ContentHeader route="recipeBook" headerText={data.name} />,
          recipeBook: <RecipeProvider recipeData={data} />,
        }}
        templateAreas={{
          xs: `header, recipeBook`,
          m: `
          header header header,
          recipeBook recipeBook recipeBook
        `,
        }}
        templateColumns={{ xs: "100%", m: "repeat(3, 1fr)" }}
        rowGap={8}
        columnGap={8}
      />
    );
    //@@viewOff:render
  },
});

Recipe = withRoute(Recipe, { authenticated: true });

//@@viewOn:exports
export { Recipe };
export default Recipe;
//@@viewOff:exports
