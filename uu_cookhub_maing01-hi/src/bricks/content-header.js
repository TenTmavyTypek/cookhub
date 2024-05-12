//@@viewOn:imports
import { createVisualComponent, useRoute } from "uu5g05";
import Config from "./config/config.js";
import { Text, Grid, Line, RichIcon } from "uu5g05-elements";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const ContentHeader = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ContentHeader",
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
    const { route, headerText } = props;

    const [, setRoute] = useRoute();
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render

    return (
      <>
        <div style={{ padding: "1rem" }}>
          <Grid templateColumns="1px 6fr" alignItems="center">
            <Grid.Item>
              <RichIcon size="xl" icon="uugds-chevron-left" onClick={() => setRoute(route)} />
            </Grid.Item>
            <Grid.Item justifySelf="center">
              <Text category="expose" segment="default" type="hero" autoFit={true}>
                {headerText}
              </Text>
            </Grid.Item>
          </Grid>
        </div>
        <Line />
      </>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ContentHeader };
export default ContentHeader;
//@@viewOff:exports
