import {Ingredient, ProductItem} from "@prisma/client";
import {PizzaSize, PizzaType} from "@/constants/pizza";

export const  calcTotalPizzaPrices = (
    type: PizzaType,
    size: PizzaSize,
    items: ProductItem[],
    ingredients: Ingredient[],
    selectedIngredients: Set<number>,
) => {
    const pizzaPrice = items.find((item) => item.pizzaType === type && item.size === size)?.price || 0;
    const totalIngredientsPrice = ingredients.filter((ingredients) => selectedIngredients.has(ingredients.id)).reduce((acc, ingredient) => acc + ingredient.price, 0);

    return pizzaPrice + totalIngredientsPrice;
}