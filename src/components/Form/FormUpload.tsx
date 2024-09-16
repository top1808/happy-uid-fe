/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  Controller,
  FieldValues,
  Control,
  UseFormSetValue,
} from "react-hook-form";
import { ImageListType, ImageType } from "react-images-uploading";
import UploadImage from "../Upload/UploadImage";

interface FormUploadProps {
  name: string;
  control?: Control<FieldValues | any>;
  setValue: UseFormSetValue<any>;
  label?: string;
  required?: boolean;
  errorMessage?: string | undefined;
}


const FormUpload: React.FC<FormUploadProps> = ({ name, control, setValue, label, required, errorMessage, ...rest }) => {
  const onChange = (imageList: ImageListType) => {
    setValue?.(name, imageList.map((image: ImageType) => image.dataURL));
  };

  return (
    <div>
      <label className="block">{label} {required && <span className="text-red-500">*</span>}</label>
      <Controller
        name={name}
        control={control}
        render={() => <UploadImage onChange={onChange} />}
        {...rest}
      />
      {errorMessage && <div className="text-red-500 text-sm">{errorMessage}</div>}
    </div>
  );
};

export default FormUpload;
