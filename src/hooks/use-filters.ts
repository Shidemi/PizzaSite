import {useSearchParams} from "next/navigation";
import {useSet} from "react-use";
import React from "react";

interface PriceProps {
    priceFrom?: number;
    priceTo?: number;
}

interface QueryFilters extends PriceProps {
    types: string;
    sizes: string;
    ingredients: string;
}

export interface Filters {
    sizes: Set<string>;
    types: Set<string>;
    prices: PriceProps;
    selectedIngredients: Set<string>;
}

interface ReturnProps extends  Filters {
    setPrices: (name: keyof PriceProps, value: number) => void;
    setTypes: (value: string) => void;
    setSizes: (value: string) => void;
    setSelectedIngredients: (value: string) => void;
}

export const useFilters = (): ReturnProps => {
    const searchParams = useSearchParams() as unknown as Map<keyof QueryFilters, string>;

    const [selectedIngredients, { toggle: toggleIngredients }] = useSet(new Set<string>(searchParams.get('ingredients')?.split(',')));

    const [sizes, { toggle: toggleSizes }] = useSet(new Set<string>(searchParams.has('sizes') ? searchParams.get('sizes')?.split(',') : []));

    const [types, { toggle: toggleTypes }] = useSet(new Set<string>(searchParams.has('types') ? searchParams.get('types')?.split(',') : []));

    const [prices, setPrices] = React.useState<PriceProps>({
        priceFrom: Number(searchParams.get('priceFrom')) || undefined,
        priceTo: Number(searchParams.get('priceTo')) || undefined,
    });

    const updatePrice = (name: keyof PriceProps, value: number) => {
        setPrices(prev => ({
            ...prev,
            [name]: value,
        }));
    }

    return React.useMemo(() => ({
        sizes,
        types,
        prices,
        selectedIngredients,
        setTypes: toggleTypes,
        setSizes: toggleSizes,
        setPrices: updatePrice,
        setSelectedIngredients: toggleIngredients,
    }), [sizes, types, prices, selectedIngredients]);
};