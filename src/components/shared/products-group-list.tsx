'use client'

import React from 'react';
import {Title} from "./title";
import {ProductCard} from "./product-card";
import {cn} from "@/lib/utils";
import { useIntersection } from "react-use";
import {useCategoryStore} from "@/store/category";
import {ProductWithRelations} from "../../../@types/prisma";

interface Props {
  className?: string;
  title: string;
  items: ProductWithRelations[];
  listClassName?: string;
  categoryId: number;
}

export const ProductsGroupList: React.FC<Props> = ({ title, categoryId, listClassName, className, items, }) => {
    const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);
    const intersectionRef = React.useRef(null);
    const intersection = useIntersection(intersectionRef, {
        threshold: 0.4,
    });

    React.useEffect(() => {
        if(intersection?.isIntersecting) {
            setActiveCategoryId(categoryId);
        }
    }, [intersection?.isIntersecting, title, categoryId]);

    return (
    <div className={className} id={title} ref={intersectionRef}>
        <Title text={title} size="lg" className="font-extrabold mb-5" />

        <div className={cn('grid grid-cols-3 gap-[50px]', listClassName)}>
            {items.map((product, i) => (
                <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    imageUrl={product.imageUrl}
                    price={product.items[0].price}
                    ingredients={product.ingredients}
                />
            ))}
        </div>
    </div>
  );
};

