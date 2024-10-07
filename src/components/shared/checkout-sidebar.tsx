import React from 'react';
import {CheckoutItemDetails} from "@/components/shared/checkout-item-details";
import {ArrowRight, Package, Percent, Truck} from "lucide-react";
import {Button, Skeleton} from "@/components/ui";
import {WhiteBlock} from "@/components/shared/white-block";

const VAT = 15;
const DELIVERY_PRICE = 250;

interface Props {
    totalAmount: number;
    loading?: boolean;
    className?: string;
}

export const CheckoutSidebar: React.FC<Props> = ({ className, loading, totalAmount }) => {
    const vatPrice = totalAmount * VAT / 100;
    const deliveryPrice = DELIVERY_PRICE;
    const totalPrice = totalAmount + vatPrice + deliveryPrice;

    return (
      <WhiteBlock className="p-6 sticky top-4">
          <div className="flex flex-col gap-1">
              <span className="text-xl">Итого</span>
              {loading ? <Skeleton className="w-48 h-11" /> :<span className="h-11 text-[34px] font-extrabold">{totalPrice} ₽</span>}
          </div>

          <CheckoutItemDetails title={
              <div className="flex items-center">
                  <Package size={18} className="mr-2 text-gray-300"/>
                  Стоимость корзины:
              </div>
          } value={loading ? <Skeleton className="w-16 h-6 rounded-[6px]" /> : `${totalAmount} ₽`}/>

          <CheckoutItemDetails title={
              <div className="flex items-center">
                  <Percent size={18} className="mr-2 text-gray-300"/>
                  Налоги:
              </div>
          } value={loading ? <Skeleton className="w-16 h-6 rounded-[6px]" /> : `${vatPrice} ₽`}/>
          <CheckoutItemDetails title={
              <div className="flex items-center">
                  <Truck size={18} className="mr-2 text-gray-300"/>
                  Доставка:
              </div>
          } value={loading ? <Skeleton className="w-16 h-6 rounded-[6px]" /> : `${deliveryPrice} ₽`}/>

          <Button type="submit" className="w-full h-14 rounded-2xl mt-6 text-base font-bold">
              Перейти к оплате
              <ArrowRight className="ml-2 w-5"/>
          </Button>
      </WhiteBlock>
  );
};

