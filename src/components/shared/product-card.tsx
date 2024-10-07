import React from 'react';
import Link from "next/link";
import {Title} from "./title";
import {Plus} from "lucide-react";
import {Button} from "../ui";
import {Ingredient} from "@prisma/client";

interface Props {
  className?: string;
  id: number;
  name: string;
  price: number;
  ingredients?: Ingredient[];
  imageUrl: string;
}

export const ProductCard: React.FC<Props> = ({ id, imageUrl, price, name, className, ingredients }) => {
  return (
    <div className={className}>
        <Link href={`/product/${id}`}>
            <div className="flex justify-center p-6 bg-secondary rounded-lg h-[260px]">
                <img className="w-[215px] h-[215px]" src={imageUrl} alt={name}/>
            </div>

            <Title text={name} size="sm" className="mb-1 mt-3 font-bold" />

            <p className="text-sm text-gray-400">
                {
                    ingredients?.map((ingredient) => ingredient.name).join(', ')
                }
            </p>

            <div className="flex justify-between items-center mt-4">
                <span className="text-[20px]">
                    от <b>{price} ₽</b>
                </span>

                <Button variant="secondary" className="text-base font-bold">
                    <Plus size={20} className="mt-1"/>
                    Добавить
                </Button>
            </div>
        </Link>
    </div>
  );
};

