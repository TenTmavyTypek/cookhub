import CookHub from "uu_cookhub_maing01-hi";
import { testProperties } from "uu5g05-test";

const CONFIG = {
  props: {
    // left: {
    //   values: ["Left as text", <span key="l">Left as JSX</span>, 0],
    // },
  },
  requiredProps: {
    // children: "Children content",
  },
};

describe(`CookHub.Bricks.ShoppingList.ShoppingListView`, () => {
  testProperties(CookHub.Bricks.ShoppingList.ShoppingListView, CONFIG);
});
