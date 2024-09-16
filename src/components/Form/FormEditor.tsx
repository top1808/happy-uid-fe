/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  Controller,
  FieldValues,
  Control,
  UseFormSetValue,
} from "react-hook-form";
import RichTextEditor from "../RichTextEditor/RichTextEditor";

interface FormEditorProps {
  name: string;
  control?: Control<FieldValues | any>;
  errorMessage?: string | undefined;
  setValue: UseFormSetValue<any>;
  required?: boolean;
  label?: string;
}


const FormEditor: React.FC<FormEditorProps> = ({ name, control, setValue, label, required, errorMessage, ...rest }) => {

  const onChange = (value: string) => {
    setValue?.(name, value);
  };

  return (
    <div>
        <label className="block">{label} {required && <span className="text-red-500">*</span>}</label>
        <Controller
          name={name}
          control={control}
          rules={{ required: required }}
          render={() => <RichTextEditor onChange={onChange} />}
          {...rest}
        />
        {errorMessage && <div className="text-red-500 text-sm">{errorMessage}</div>}
    </div>
  );
};

export default FormEditor;
