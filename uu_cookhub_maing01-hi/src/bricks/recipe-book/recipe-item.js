//@@viewOn:imports
import { createVisualComponent, Utils, Content, useRoute, useState } from "uu5g05";
import Config from "./config/config.js";
import { Box, Grid, Tile, Text, Modal } from "uu5g05-elements";
import { Image } from "uu5imagingg01";
import Uu5TilesElements from "uu5tilesg02-elements";
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

const RecipeItem = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "RecipeItem",
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
    const { data } = props.data;
    const [, setRoute] = useRoute();

    function ItemHeader() {
      return (
        <Grid justifyContent="center">
          <Text>{data.name}</Text>
        </Grid>
      );
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, RecipeItem);

    return currentNestingLevel ? (
      <div {...attrs}>
        <Uu5TilesElements.Tile
          onClick={() => setRoute("recipe", data)}
          borderRadius="expressive"
          footerSeparator
          footer={<ItemHeader />}
        >
          <Image lightbox={false} src={data.image} />
        </Uu5TilesElements.Tile>
      </div>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { RecipeItem };
export default RecipeItem;
//@@viewOff:exports
