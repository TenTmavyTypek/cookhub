//@@viewOn:imports
import { createComponent, useDataObject, useEffect, useSession } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Config from "./config/config.js";
import Calls from "../../calls.js";
import RecipeView from "./recipe-view.js";
import { Form } from "uu5g05-forms";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:helpers
//@@viewOff:helpers

const RecipeProvider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "RecipeProvider",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { children, recipeData } = props;
    console.log("recipeData", recipeData);
    //@@viewOff:private

    //@@viewOn:hooks
    const { identity } = useSession();

    const callResult = useDataObject({
      handlerMap: {
        load: () => Calls.getRecipe({ id: recipeData.id }),
        listRecipes: Calls.listRecipes,
        createRecipe: Calls.createRecipe,
        deleteRecipe: Calls.deleteRecipe,
        updateRecipe: Calls.updateRecipe,
      },
    });

    console.log("callResult", callResult);

    useEffect(() => {
      if (callResult.state === "ready") callResult.handlerMap.load;
      // eslint-disable-next-line uu5/hooks-exhaustive-deps
    }, [recipeData.id]);
    //@@viewOff:hooks

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const { state, data, handlerMap } = callResult;
    console.log("recipeData", data);

    switch (state) {
      case "pendingNoData":
      case "pending":
        return <Uu5Elements.Pending size="max" />;
      case "itemPending ":
        return <Uu5Elements.Pending size="max" />;
      case "readyNoData":
      case "ready":
        return <RecipeView data={data} handlerMap={handlerMap} />;
    }

    return children ?? null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { RecipeProvider };
export default RecipeProvider;
//@@viewOff:exports
