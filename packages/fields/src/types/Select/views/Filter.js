/** @jsx jsx */

import { jsx } from '@emotion/core';
import { Fragment } from 'react';
import Select from '@k5ui/select';
import { CheckMark, Options, OptionPrimitive } from '@k5ui/options';
import { Radio, RadioGroup } from '@k5ui/filters';
import { gridSize } from '@k5ui/theme';

const EventCatcher = props => (
  <div
    onClick={e => {
      e.preventDefault();
      e.stopPropagation();
    }}
    {...props}
  />
);
const SelectWrapper = props => <div css={{ marginTop: gridSize * 2 }} {...props} />;

const SelectFilterView = ({ innerRef, field, value, onChange }) => {
  const handleRadioChange = newValue => {
    const inverted = newValue === 'does_match' ? false : true;
    onChange({ ...value, inverted });
  };

  const handleSelectChange = newValue => {
    if (newValue.length == 0) return;
    const options = [].concat(newValue); // ensure consistent data shape
    onChange({ ...value, options });
  };

  const radioValue = value.inverted ? 'does_not_match' : 'does_match';
  const selectProps = {
    components: { Option: CheckMarkOption },
    innerRef: innerRef,
    onChange: handleSelectChange,
    options: field.options,
    placeholder: 'Select...',
    value: value.options,
    isMulti: true,
  };

  return (
    <Fragment>
      <RadioGroup onChange={handleRadioChange} value={radioValue}>
        <Radio value="does_match">Matches</Radio>
        <Radio value="does_not_match">Does not match</Radio>
      </RadioGroup>
      <SelectWrapper>
        {field.options.length > 8 ? (
          <EventCatcher>
            <Select menuPortalTarget={document.body} {...selectProps} />
          </EventCatcher>
        ) : (
          <Options displaySearch={false} {...selectProps} />
        )}
      </SelectWrapper>
    </Fragment>
  );
};

const CheckMarkOption = ({ children, ...props }) => (
  <OptionPrimitive {...props}>
    <span>{children}</span>
    <CheckMark isFocused={props.isFocused} isSelected={props.isSelected} />
  </OptionPrimitive>
);

export default SelectFilterView;
