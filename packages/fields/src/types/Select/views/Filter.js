/** @jsx jsx */

import { jsx } from '@emotion/core';
import { Component, Fragment } from 'react';
import Select from '@ksjs-ui/select';
import { CheckMark, Options, OptionPrimitive } from '@ksjs-ui/options';
import { Radio, RadioGroup } from '@ksjs-ui/filters';
import { gridSize } from '@ksjs-ui/theme';

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

export default class SelectFilterView extends Component {
  state = { inverted: this.props.value.inverted };
  handleRadioChange = value => {
    const { onChange, value: oldValue } = this.props;
    const inverted = value === 'does_match' ? false : true;
    onChange({ ...oldValue, inverted });
  };
  handleSelectChange = value => {
    const { onChange, value: oldValue } = this.props;
    const options = [].concat(value); // ensure consistent data shape
    onChange({ ...oldValue, options });
  };
  render() {
    const { innerRef, field, value } = this.props;

    const radioValue = value.inverted ? 'does_not_match' : 'does_match';
    const selectProps = {
      components: { Option: CheckMarkOption },
      innerRef: innerRef,
      onChange: this.handleSelectChange,
      options: field.options,
      placeholder: 'Select...',
      value: value.options,
    };

    return (
      <Fragment>
        <RadioGroup onChange={this.handleRadioChange} value={radioValue}>
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
  }
}

const CheckMarkOption = ({ children, ...props }) => (
  <OptionPrimitive {...props}>
    <span>{children}</span>
    <CheckMark isFocused={props.isFocused} isSelected={props.isSelected} />
  </OptionPrimitive>
);
