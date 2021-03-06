/** @jsx jsx */

import { jsx } from '@emotion/core';

import { FieldContainer, FieldLabel, FieldDescription, FieldInput } from '@k5ui/fields';
import { TextDayPicker } from '@k5ui/day-picker';
import { Alert } from '@k5ui/alert';

const CalendarDayField = ({ autoFocus, field, value, errors, onChange }) => {
  const htmlID = `ks-daypicker-${field.path}`;

  return (
    <FieldContainer>
      <FieldLabel htmlFor={htmlID} field={field} errors={errors} />
      {field.config.adminDoc && <FieldDescription>{field.config.adminDoc}</FieldDescription>}
      <FieldInput>
        <TextDayPicker
          id={htmlID}
          autoFocus={autoFocus}
          date={value}
          format={field.config.format}
          onChange={onChange}
        />
      </FieldInput>

      {errors.map(({ message, data }) => (
        <Alert appearance="danger" key={message}>
          {message}
          {data ? ` - ${JSON.stringify(data)}` : null}
        </Alert>
      ))}
    </FieldContainer>
  );
};

export default CalendarDayField;
