import React from 'react';
import { Input } from '@k5ui/input';

const TextFilterView = ({ onChange, filter, field, innerRef, value }) => {
  const handleChange = event => {
    const value = event.target.value;
    if (/^-?\d*\.?\d*$/.test(value)) {
      onChange(value);
    }
  };

  if (!filter) return null;

  const placeholder = field.getFilterLabel(filter);

  return <Input onChange={handleChange} ref={innerRef} placeholder={placeholder} value={value} />;
};

export default TextFilterView;
