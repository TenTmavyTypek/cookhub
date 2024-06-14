//@@viewOn:imports
import { createVisualComponent, Utils, useSession, useState, useScreenSize, useEffect, useCall } from "uu5g05";
import Config from "./config/config.js";
import { Box, GridTemplate, Grid, ScrollableBox, Tile, Button, Text, Modal } from "uu5g05-elements";
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
    const { data, handlerMap } = props;
    const [screenSize, setScreenSize] = useScreenSize();
    const [ingredientList, setIngredientList] = useState();
    const [isModalOpen, setIsModalOpen] = useState();
    const [tileWidth, setTileWidth] = useState();
    const [imgSize, setImgSize] = useState();
    const { identity } = useSession();
    const ingredientListCall = useCall(Calls.listIngredients);
    const ingredientCreateCall = useCall(Calls.createIngredient);
    const deleteIngredientCall = useCall(Calls.deleteIngredient);
    const unitList = [{ value: "g" }, { value: "kg" }, { value: "l" }, { value: "ml" }, { value: "pcs" }];
    const [ingredients, setIngredients] = useState();
    const { value: formValue, setItemValue, submit } = useFormApi();

    useEffect(() => {
      ingredientListCall.call({ userId: identity.uuIdentity }).then((res) => setIngredientList(res.itemList));
    }, []);

    useEffect(() => {
      let data = getIngredients();
      setIngredients(data);
    }, [data.ingredientList]);

    useEffect(() => {
      let size, width;
      switch (screenSize) {
        case "xs":
          size = "s";
          width = "15rem";
          break;
        case "s":
          size = "m";
          width = "20rem";
          break;
        default:
          size = "l";
          width = "40rem";
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
          if (foundObject && foundObject.name) {
            tableData.push({
              Ingredient: foundObject.name,
              Amount: recipeIngredient.quantity + recipeIngredient.unit,
            });
          }
        }
        return tableData;
      }
    }

    function getActionList({ rowIndex, data }) {
      return [
        {
          icon: "mdi-close",
          tooltip: "Delete ingredient",
          onClick: () => handleDeleteIngredientFromRecipe(data),
          collapsed: false,
        },
      ];
    }

    async function handleDeleteIngredientFromRecipe(e) {
      let selectedIngredient = ingredientList.find((ingredient) => ingredient.name === e.Ingredient);
      await deleteIngredientCall.call({ id: selectedIngredient.id });
      data.ingredientList = data.ingredientList.filter((ingredient) => ingredient.id !== selectedIngredient.id);
    }

    function IngredientsSection(props) {
      const { modalView } = props;
      return (
        <Grid style={{ padding: "2rem" }} justifyItems="center">
          <Box style={{ padding: "1rem", borderRadius: "1rem", textAlign: "center" }} justifyItems="center">
            <Text category="expose" segment="default" style={{ paddingBottom: "1rem" }} type="lead" autoFit={true}>
              Ingredients
            </Text>
            <Grid.Item>
              <Tile width={modalView ? "100%" : tileWidth}>
                <ScrollableBox maxHeight="50%">
                  <Uu5TilesElements.Table
                    data={ingredients || getIngredients()}
                    getActionList={isModalOpen && getActionList}
                  ></Uu5TilesElements.Table>
                </ScrollableBox>
              </Tile>
            </Grid.Item>
          </Box>
        </Grid>
      );
    }

    function MethodSection() {
      return (
        <Grid style={{ padding: "2rem" }} justifyItems="center">
          <Box style={{ padding: "1rem", borderRadius: "1rem", textAlign: "center" }} justifyItems="center">
            <Text category="expose" style={{ paddingBottom: "1rem" }} segment="default" type="lead" autoFit={true}>
              Method
            </Text>
            <Grid.Item>
              <Tile width={tileWidth}>
                <ScrollableBox maxHeight="20rem">{data.method}</ScrollableBox>
              </Tile>
            </Grid.Item>
          </Box>
        </Grid>
      );
    }

    function EditButton() {
      return (
        <Grid justifyItems="end">
          <Button
            colorScheme="warning"
            significance="highlighted"
            size="xl"
            style={{ margin: "0.5rem" }}
            icon="uugds-edit-inline"
            onClick={() => setIsModalOpen(true)}
          >
            Edit
          </Button>
        </Grid>
      );
    }

    function handleUpdate() {
      //TODO
    }

    async function handleAddIngredient(formData) {
      let ingredient = ingredientList.find((obj) => obj.name === formData.value.ingredient);
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

          const dtoIn = {
            id: data.id,
            ingredientList: newIngredientList,
          };
          await handlerMap.updateRecipe(dtoIn);
        }
      } else {
        const ingredientDtoIn = {
          userId: identity.uuIdentity,
          name: formData.value.ingredient,
        };
        await ingredientCreateCall
          .call(ingredientDtoIn)
          .then((res) => handleAddIngredientToRecipe(res.id, formData.value.amount, formData.value.unit));
      }
    }

    async function handleAddIngredientToRecipe(ingredientId, amount, unit) {
      let newIngredientList = [...data.ingredientList];
      newIngredientList.push({
        id: ingredientId,
        quantity: amount,
        unit: unit,
      });

      const dtoIn = {
        id: data.id,
        ingredientList: newIngredientList,
      };

      await handlerMap.updateRecipe(dtoIn);
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
                xs: `button, image, ingredients, method`,
                s: `button, image, ingredients, method`,
                m: `button, image, ingredients, method`,
                l: `button, image, ingredients, method`,
                xl: `
              image image,
              ingredients method,
              button button
              `,
              }}
              templateColumns={{ xs: "100%", xl: "repeat(2, 1fr)" }}
              rowGap={8}
              columnGap={8}
            />
          </Box>
          <Form.View>
            <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
              <Form onSubmit={(e) => handleAddIngredient(e.data)}>
                <Box borderRadius={"expressive"}>
                  <IngredientsSection modalView />
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
