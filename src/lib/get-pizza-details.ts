import {mapPizzaSize, mapPizzaType, PizzaSize, PizzaType} from "@/constants/pizza";
import {Ingredient, ProductItem} from "@prisma/client";
import {calcTotalPizzaPrices} from "@/lib/calc-total-pizza-prices";

export const getPizzaDetails = (
    type: PizzaType,
    size: PizzaSize,
    items: ProductItem[],
    ingredients: Ingredient[],
    selectedIngredients: Set<number>,
)=> {

    const textDetails = `${size} см, ${mapPizzaType[type]} тесто, ${mapPizzaSize[size]} пицца`;

    const totalPrice = calcTotalPizzaPrices(
        type,
        size,
        items,
        ingredients,
        selectedIngredients
    );

    return {
        totalPrice,
        textDetails
    }
}