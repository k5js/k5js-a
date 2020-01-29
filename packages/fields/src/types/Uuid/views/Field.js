/** @jsx jsx */

import { jsx } from '@emotion/core';
import { Component } from 'react';

import { FieldContainer, FieldLabel, FieldDescription, FieldInput } from '@ksjs-ui/fields';
import { Input } from '@ksjs-ui/input';

export default class UuidField extends Component {
  onChange = event => {
    this.props.onChange(event.target.value);
  };
  render() {
    const { autoFocus, field, errors, value: serverValue } = this.props;
    const value = serverValue || '';
    const htmlID = `ks-input-${field.path}`;
    const canRead = errors.every(
      error => !(error instanceof Error && error.name === 'AccessDeniedError')
    );
    const error = errors.find(
      error => error instanceof Error && error.name === 'AccessDeniedError'
    );

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
            onChange={this.onChange}
            id={htmlID}
          />
        </FieldInput>
      </FieldContainer>
    );
  }
}
