/** @jsx jsx */

import { jsx } from '@emotion/core';

import { FieldContainer, FieldLabel, FieldDescription, FieldInput } from '@k5ui/fields';
import { Input } from '@k5ui/input';

const UuidField = ({ onChange, autoFocus, field, errors, value: serverValue }) => {
  const handleChange = event => {
    onChange(event.target.value);
  };

  const value = serverValue || '';
  const htmlID = `ks-input-${field.path}`;
  const canRead = errors.every(
    error => !(error instanceof Error && error.name === 'AccessDeniedError')
  );
  const error = errors.find(error => error instanceof Error && error.name === 'AccessDeniedError');

  return (
    <FieldContainer>
      <FieldLabel htmlFor={htmlID} field={field} errors={errors} />
      {field.config.adminDoc && <FieldDescription>{field.config.adminDoc}</FieldDescription>}
      <FieldInput>
        <Input
          autoComplete="off"
          autoFocus={autoFocus}
          type="text"
          value={canRead ? value : undefined}
          placeholder={canRead ? undefined : error.message}
          onChange={handleChange}
          id={htmlID}
        />
      </FieldInput>
    </FieldContainer>
  );
};

export default UuidField;
