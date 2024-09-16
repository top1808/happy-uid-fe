/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  Controller,
  FieldValues,
  Control,
  UseFormSetValue,
} from "react-hook-form";
import TagSelect from "../TagSelect/TagSelect";

interface FormTagProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control?: Control<FieldValues | any>;
  errorMessage?: string | undefined;
  setValue: UseFormSetValue<any>;
  required?: boolean;
  label?: string;
}

const FormTag: React.FC<FormTagProps> = ({
  name,
  control,
  setValue,
  label,
  required,
  errorMessage,
  ...rest
}) => {
  const onChange = (tags: string []) => {
    setValue?.(name, tags);
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: required }}
      render={() => <TagSelect onChange={onChange} />}
      {...rest}
    />
  );
};

export default FormTag;
