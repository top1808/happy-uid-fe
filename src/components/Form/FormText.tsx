/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  Controller,
  FieldValues,
  Control,
  UseFormSetValue,
} from "react-hook-form";

interface FormTextProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control?: Control<FieldValues | any>;
  errorMessage?: string | undefined;
  setValue: UseFormSetValue<any>;
  required?: boolean;
  label?: string;
}

const FormText: React.FC<FormTextProps> = ({ name, control, setValue, label, required, errorMessage, ...rest }) => {

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue?.(name, e.target.value);
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: required }}
      render={() => (
        <>
            <label className="block">{label} {required && <span className="text-red-500">*</span>}</label>
            <input
                type="text"
                className="block w-full px-4 py-2 border-2 border-gray-300 rounded-md"
                onChange={onChange}
                autoFocus
                {...rest}
            />
            {errorMessage && <div className="text-red-500 text-sm">{errorMessage}</div>}
        </>
      )}
    />
  );
};

export default FormText;
