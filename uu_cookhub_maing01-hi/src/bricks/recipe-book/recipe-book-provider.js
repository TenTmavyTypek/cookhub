//@@viewOn:imports
import { createComponent, useDataList, useDataObject, useEffect, useSession } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Config from "./config/config.js";
import Calls from "../../calls.js";
import RecipeBookView from "./recipe-book-view.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:helpers
//@@viewOff:helpers

const RecipeBookProvider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "RecipeBookProvider",
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
    //@@viewOff:private

    //@@viewOn:hooks
    const { identity } = useSession();

    const callResult = useDataList({
      handlerMap: {
        load: () => Calls.listRecipes({ userId: identity.uuIdentity }),
        createRecipe: Calls.createRecipe,
        deleteRecipe: Calls.deleteRecipe,
        updateRecipe: Calls.updateRecipe,
        getRecipe: Calls.getRecipe,
      },
    });

    console.log("uuId", identity.uuIdentity);

    useEffect(() => {
      if (callResult.state === "ready") callResult.handlerMap.load();
      // eslint-disable-next-line uu5/hooks-exhaustive-deps
    }, [identity.uuIdentity]);
    //@@viewOff:hooks

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const { state, data, handlerMap } = callResult;

    switch (state) {
      case "pendingNoData":
      case "pending":
        return <Uu5Elements.Pending size="max" />;
      case "itemPending ":
        return <Uu5Elements.Pending size="max" />;
      case "readyNoData":
      case "ready":
        return <RecipeBookView data={data} handlerMap={handlerMap} />;
    }

    return children ?? null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { RecipeBookProvider };
export default RecipeBookProvider;
//@@viewOff:exports
