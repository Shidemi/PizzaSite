'use client';

import {FormProvider, SubmitHandler, useForm} from "react-hook-form";


import {CheckoutSidebar, Container, Title} from "@/components/shared";
import {useCart} from "@/hooks";
import {zodResolver} from "@hookform/resolvers/zod";
import {CheckoutCart, CheckoutPersonalForm} from "@/components";
import {CheckoutAddressForm} from "@/components/shared/checkout/checkout-address-form";
import {checkoutFormSchema, CheckoutFormValues} from "@/components/shared/checkout/checkout-form-schema";

export default function Checkout() {
    const {totalAmount, items, removeCartItem, updateItemQuantity, loading} = useCart();

    const form = useForm<CheckoutFormValues>({
        resolver: zodResolver(checkoutFormSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            address: '',
            comment: '',
        }
    });

    const onSubmit: SubmitHandler<CheckoutFormValues> = (data) => {
        console.log(data);
    }

    const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
        const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
        updateItemQuantity(id, newQuantity);
    }



    return (
        <Container className="mt-10">
            <Title text="Оформление заказа" className="font-extrabold mb-8 text-[36px]"/>

            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex gap-10">
                        {/* Левая часть */}
                        <div className='flex flex-col gap-10 flex-1 mb-20'>

                            <CheckoutCart
                                items={items}
                                onClickCountButton={onClickCountButton}
                                removeCartItem={removeCartItem}
                                loading={loading}
                            />

                            <CheckoutPersonalForm className={loading ? "opacity-40 pointer-events-none" : ""}/>

                            <CheckoutAddressForm className={loading ? "opacity-40 pointer-events-none" : ""}/>
                        </div>

                        {/* Правая часть */}
                        <div className="w-[450px]">
                            <CheckoutSidebar
                                totalAmount={totalAmount}
                                loading={loading}
                            />
                        </div>
                    </div>
                </form>
            </FormProvider>
        </Container>
    );
}