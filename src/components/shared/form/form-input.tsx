import {RequiredSymbol} from "@/components/shared/required-symbol";
import {Input} from "@/components/ui";
import {ErrorText} from "@/components/shared/error-text";
import React from "react";
import {ClearButton} from "@/components/shared";
import {useFormContext} from "react-hook-form";


interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label?: string;
    required?: boolean;
    className?: string;
}

export const FormInput: React.FC<Props> = ({name, label, required, className, ...props}) => {
    const {
        register,
        formState: {errors},
        watch,
        setValue
    } = useFormContext();

    const value = watch(name);
    const errorText = errors[name]?.message as string;

    const onClickClear = () => {
        setValue(name, '');
    }

    return(
        <div className={className}>
            {label && (
                <p className="font-medium mb-2">
                    {label} {required && <RequiredSymbol />}
                </p>
            )}

            <div className="relative">
                <Input
                    className="h-12 text-md"
                    {...register(name)}
                    {...props}
                />

                {value && <ClearButton onClick={onClickClear}/>}
            </div>

            {errorText && <ErrorText text={errorText} className="mt-2"/>}

        </div>
    )

}