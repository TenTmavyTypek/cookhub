//@@viewOn:imports
import { createVisualComponent, Utils, Content, useScreenSize, useState, useEffect } from "uu5g05";
import Config from "./config/config.js";
import { Box, Grid } from "uu5g05-elements";
import { Image } from "uu5imagingg01";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () =>
    Config.Css.css({
      paddingTop: 35,
    }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const Header = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Header",
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
    const [screenSize, setScreenSize] = useScreenSize();
    const [imgSize, setImgSize] = useState();

    useEffect(() => {
      let size;
      switch (screenSize) {
        case "xs":
          size = "s";
          break;
        case "s":
          size = "m";
          break;
        default:
          size = "l";
          break;
      }
      setImgSize(size);
    }, [screenSize]);
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, Header);

    return currentNestingLevel ? (
      <div {...attrs}>
        <Grid justifyItems="center">
          <Grid.Item>
            <Box significance="subdued" shape="background" aspectRatio="16x9" size={imgSize}>
              <Image src="../assets/logo.png" />
            </Box>
          </Grid.Item>
        </Grid>
      </div>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { Header };
export default Header;
//@@viewOff:exports
