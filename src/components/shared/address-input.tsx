'use client';

import React from 'react';
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';

interface Props {
    onChange?: (value?: string) => void;
}

export const AddressInput: React.FC<Props> = ({ onChange }) => {
    return (
        <AddressSuggestions
            token="60ccefa0cc983eea39a363bba28a8e3e37b84606"
            onChange={(data) => onChange?.(data?.value)}
        />
    );
};