//@@viewOn:imports
import { createVisualComponent, Utils, Content, useState } from "uu5g05";
import Config from "./config/config.js";
import { Box, Grid, Button, Text, RichIcon, Modal } from "uu5g05-elements";
import { Image } from "uu5imagingg01";
import Uu5TilesElements from "uu5tilesg02-elements";
import RecipeItem from "./recipe-item.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () => Config.Css.css({}),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const RecipeBookView = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "RecipeBookView",
  nestingLevel: ["areaCollection", "area"],
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { children } = props;
    const [recipeModalOpen, setRecipeModalOpen] = useState(false);

    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, RecipeBookView);

    return currentNestingLevel ? (
      <div {...attrs}>
        <Uu5TilesElements.Grid
          horizontalGap={"3rem"}
          style={{ padding: "3rem" }}
          data={props.data}
          tileMaxWidth={500}
          tileMinWidth={50}
        >
          <RecipeItem />
        </Uu5TilesElements.Grid>
        <Button>Hello</Button>
        <Modal
          open={recipeModalOpen}
          closeOnEsc={true}
          closeOnOverlayClick={true}
          closeOnButtonClick={true}
          onClose={() => setRecipeModalOpen(false)}
          header={
            <Grid justifyContent="center">
              <Text>{"Create Recipe"}</Text>
            </Grid>
          }
        >
          {"content"}
        </Modal>
      </div>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { RecipeBookView };
export default RecipeBookView;
//@@viewOff:exports
