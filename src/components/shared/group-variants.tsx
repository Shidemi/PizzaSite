'use client';

import React from 'react';
import {cn} from "@/lib/utils";

export type Variant = {
    name: string;
    value: string;
    disabled?: boolean;
}

interface Props {
  items: readonly Variant[];
  value?: Variant['value'];
  onClick?: (value: Variant['value']) => void;
  className?: string;
}

export const GroupVariants: React.FC<Props> = ({ items, value, onClick, className }) => {
    return (
        <div className={cn('flex justify-between bg-[#F3F3F7] rounded-3xl p-1 select-none', className)}>
            {items.map((item) => (
                <button
                    key={item.name}
                    onClick={() => onClick?.(item.value)}
                    disabled={item.disabled}
                    className={cn(
                        'flex items-center justify-center cursor-pointer h-[30px] px-5 flex-1 rounded-3xl transition-all duration-400 text-sm',
                        {
                            'bg-white shadow': item.value === value,
                            'text-gray-500 opacity-50 pointer-events-none': item.disabled,
                        },
                    )}>
                    {item.name}
                </button>
            ))}
        </div>
    );
};

