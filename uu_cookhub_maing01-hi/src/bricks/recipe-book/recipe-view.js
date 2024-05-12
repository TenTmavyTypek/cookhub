//@@viewOn:imports
import { createVisualComponent, Utils, Content, useSession, useState, useScreenSize, useEffect, useCall } from "uu5g05";
import Config from "./config/config.js";
import { Box, GridTemplate, Grid, ScrollableBox, Tile, Line, Button, Text, RichIcon, Modal } from "uu5g05-elements";
import { Image } from "uu5imagingg01";
import Uu5TilesElements from "uu5tilesg02-elements";
import Calls from "../../calls.js";
import { Form, FormText, FormNumber, FormSelect, useFormApi, SubmitButton } from "uu5g05-forms";
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

const RecipeView = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "RecipeView",
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
    const { children, data, handlerMap } = props;
    const [screenSize, setScreenSize] = useScreenSize();
    const [ingredientList, setIngredientList] = useState();
    const [isModalOpen, setIsModalOpen] = useState();
    const [tileWidth, setTileWidth] = useState();
    const [imgSize, setImgSize] = useState();
    const { identity } = useSession();
    const ingredientListCall = useCall(Calls.listIngredients);
    const unitList = [{ value: "g" }, { value: "kg" }, { value: "l" }, { value: "ml" }, { value: "pcs" }];
    const { value: formValue, setItemValue, submit } = useFormApi();

    useEffect(() => {
      ingredientListCall.call({ userId: identity.uuIdentity }).then((res) => setIngredientList(res.itemList));
    }, []);

    console.log("identity.uuIdentity", identity.uuIdentity);
    console.log("ingredientList", ingredientList);
    console.log("dataReceiptData", data);

    useEffect(() => {
      let size, width;
      switch (screenSize) {
        case "xs":
          size = "s";
          width = "20rem";
          break;
        case "s":
          size = "m";
          width = "25rem";
          break;
        default:
          size = "l";
          width = "50rem";
          break;
      }
      setImgSize(size);
      setTileWidth(width);
    }, [screenSize]);

    function RecipeImage() {
      return (
        <Grid justifyItems="center" style={{ paddingTop: "1rem" }}>
          <Grid.Item>
            <Box significance="subdued" shape="background" aspectRatio="16x9" size={imgSize}>
              <Image
                style={{ borderRadius: "1rem" }}
                shape="rect16x10"
                lightbox={false}
                src={data?.image || "https://placehold.co/600x400"}
              />
            </Box>
          </Grid.Item>
        </Grid>
      );
    }

    function findObjectById(id, array) {
      return array.find((obj) => obj.id === id);
    }

    function getIngredients() {
      if (ingredientList) {
        let tableData = [];
        for (let recipeIngredient of data.ingredientList) {
          let foundObject = findObjectById(recipeIngredient.id, ingredientList);
          tableData.push({
            Ingredient: foundObject.name,
            Amount: recipeIngredient.quantity + recipeIngredient.unit,
          });
        }
        return tableData;
      }
    }

    function IngredientsSection() {
      return (
        <Grid style={{ padding: "2rem" }} justifyItems="center">
          <Text category="expose" segment="default" type="lead" autoFit={true}>
            Ingredients
          </Text>
          <Grid.Item>
            <Tile width={tileWidth}>
              <ScrollableBox maxHeight="50%">
                <Uu5TilesElements.Table data={getIngredients()}></Uu5TilesElements.Table>
              </ScrollableBox>
            </Tile>
          </Grid.Item>
        </Grid>
      );
    }

    function MethodSection() {
      return (
        <Grid style={{ padding: "2rem" }} justifyItems="center">
          <Text category="expose" segment="default" type="lead" autoFit={true}>
            Method
          </Text>
          <Grid.Item>
            <Tile width={tileWidth}>
              <ScrollableBox maxHeight="20rem">{data.method}</ScrollableBox>
            </Tile>
          </Grid.Item>
        </Grid>
      );
    }

    function EditButton() {
      return (
        <Grid style={{ padding: "2rem" }} justifyItems="center">
          <Button icon="uugds-edit-inline" onClick={() => setIsModalOpen(true)}>
            Edit
          </Button>
        </Grid>
      );
    }

    function handleUpdate() {
      //TODO
    }

    async function handleAddIngredient(formData) {
      console.log("Ingredients list", ingredientList);
      console.log("dataINg", formData.value);
      let ingredient = ingredientList.find((obj) => obj.name === formData.value.ingredient);
      console.log(ingredient);
      if (ingredient) {
        let isIngredientInRecipe = data.ingredientList.find((obj) => obj.id === ingredient.id);
        if (isIngredientInRecipe && isIngredientInRecipe.unit === formData.value.unit) {
          isIngredientInRecipe.quantity += formData.value.amount;

          const dtoIn = {
            id: data.id,
            ingredientList: data.ingredientList,
          };
          await handlerMap.updateRecipe(dtoIn);
        } else {
          let newIngredientList = [...data.ingredientList];
          newIngredientList.push({ id: ingredient.id, quantity: formData.value.amount, unit: formData.value.unit });

          console.log("newIngredientList", newIngredientList);
          const dtoIn = {
            id: data.id,
            ingredientList: newIngredientList,
          };
          await handlerMap.updateRecipe(dtoIn);
        }
      } else {
        console.log("NoINgr");
      }
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, RecipeView);

    return currentNestingLevel ? (
      <div {...attrs}>
        <Form.Provider>
          <Box borderRadius={"expressive"} style={{ margin: "1rem" }}>
            <GridTemplate
              contentMap={{
                image: <RecipeImage />,
                ingredients: <IngredientsSection />,
                method: <MethodSection />,
                button: <EditButton />,
              }}
              templateAreas={{
                xs: `image, ingredients, method, button`,
                m: `
              image image,
              ingredients method,
              button button
              `,
              }}
              templateColumns={{ xs: "100%", m: "repeat(2, 1fr)" }}
              rowGap={8}
              columnGap={8}
            />
          </Box>
          <Form.View>
            <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
              <Form onSubmit={(e) => handleAddIngredient(e.data)}>
                <Box borderRadius={"expressive"}>
                  <IngredientsSection />
                  <Grid style={{ padding: "1rem" }} templateColumns={"5fr 2fr 3fr"}>
                    <FormText name="ingredient" label="Ingredient"></FormText>
                    <FormNumber name="amount" label="Amount"></FormNumber>
                    <FormSelect name="unit" label="Unit" initialValue="g" itemList={unitList}></FormSelect>
                  </Grid>
                  <Grid style={{ padding: "1rem" }}>
                    <SubmitButton>Add ingredient</SubmitButton>
                  </Grid>
                </Box>
              </Form>
            </Modal>
          </Form.View>
        </Form.Provider>
      </div>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { RecipeView };
export default RecipeView;
//@@viewOff:exports
