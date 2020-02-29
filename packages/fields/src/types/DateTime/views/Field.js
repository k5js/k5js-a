/** @jsx jsx */

import { jsx } from '@emotion/core';

import { FieldContainer, FieldLabel, FieldDescription, FieldInput } from '@k5ui/fields';
import { TextDayTimePicker } from '@k5ui/day-picker';

const DateTimeField = ({ autoFocus, field, onChange, value, errors }) => {
  const htmlID = `ks-input-${field.path}`;

  return (
    <FieldContainer>
      <FieldLabel htmlFor={htmlID} field={field} errors={errors} />
      {field.config.adminDoc && <FieldDescription>{field.config.adminDoc}</FieldDescription>}
      <FieldInput>
        <TextDayTimePicker id={htmlID} date={value} onChange={onChange} autoFocus={autoFocus} />
      </FieldInput>
    </FieldContainer>
  );
};

export default DateTimeField;
