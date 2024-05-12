//@@viewOn:imports
import { createVisualComponent, useRoute } from "uu5g05";
import { withRoute } from "uu_plus4u5g02-app";

import Config from "./config/config.js";
import { GridTemplate } from "uu5g05-elements";
import RecipeBookProvider from "../bricks/recipe-book/recipe-book-provider.js";
import ContentHeader from "../bricks/content-header.js";
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

    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <GridTemplate
        contentMap={{
          header: <ContentHeader route="home" headerText="Recipe Book" />,
          recipeBook: <RecipeBookProvider />,
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

RecipeBook = withRoute(RecipeBook, { authenticated: true });

//@@viewOn:exports
export { RecipeBook };
export default RecipeBook;
//@@viewOff:exports
