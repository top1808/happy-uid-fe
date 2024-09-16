import React from 'react';
import Select, { MultiValue, Props as SelectProps } from 'react-select';
import { OptionFilter } from '../../types/selectType';

interface MultiSelectProps extends SelectProps<OptionFilter, true> {
  options: OptionFilter[];
  value: MultiValue<OptionFilter>;
  onChange: (value: MultiValue<OptionFilter>) => void;
}

const MultiSelect: React.FC<MultiSelectProps> = ({ options, value, onChange, ...props }) => {
  return (
    <Select
      isMulti
      options={options}
      value={value}
      onChange={onChange}
      classNamePrefix="select"
      placeholder="Select tags..."
      styles={{
        control: (provided) => ({
          ...provided,
          borderColor: 'gray-300',
          boxShadow: 'none',
          '&:hover': {
            borderColor: 'gray-500',
          },
        }),
        multiValue: (provided) => ({
          ...provided,
          backgroundColor: '#e2e8f0',
        }),
        multiValueLabel: (provided) => ({
          ...provided,
          color: '#1a202c',
        }),
        multiValueRemove: (provided) => ({
          ...provided,
          color: '#e53e3e',
          ':hover': {
            backgroundColor: '#e53e3e',
            color: 'white',
          },
        }),
      }}
      {...props}
    />
  );
};

export default MultiSelect;
