/** @jsx jsx */

import { Component } from 'react';
import { jsx } from '@emotion/core';
import { Options } from '@k5ui/options';
import { arrayToObject } from '@k5js/utils';

function isOptionSelected(opt, selected) {
  return Boolean(selected.filter(x => x.path === opt.path).length);
}
function getOptionValue(opt) {
  return opt.path;
}

export const pseudoLabelField = { label: 'Label', path: '_label_' };

type FieldType = object;
export type FieldSelectProps = {
  fields?: FieldType[];
  onChange?: (x0: FieldType) => void;
  value?: FieldType | FieldType[];
  includeLabelField?: boolean;
  isOptionDisabled?: $TSFixMe;
  innerRef?: $TSFixMe;
  isMulti?: boolean;
  listFields?: $TSFixMe[];
  placeholder?: $TSFixMe;
  components?: $TSFixMe;
};

/**
 * Why does this exist?
 * --------------------
 * Because fields can contain an `options` property, which react-select
 * interprets as an OptionGroup.
 *
 * How does it solve the problem?
 * ------------------------------
 * By removing the `options` property before passing fields on to react-select,
 * and returning it during `onChange`.
 */

export default class FieldSelect extends Component<FieldSelectProps> {
  constructor(props) {
    super(props);
    const { fields, includeLabelField } = props;
    const sanitizedOptions = fields.map(({ options, ...field }) => field);
    if (includeLabelField) {
      sanitizedOptions.unshift(pseudoLabelField);
    }

    this.options = sanitizedOptions;
  }
  options = [];
  onChange = selected => {
    const { fields: listFields, isMulti, onChange } = this.props;
    const arr = Array.isArray(selected) ? selected : [selected];
    const diffMap = arrayToObject(arr, 'path', () => true);
    const fields = [pseudoLabelField].concat(listFields).filter(i => diffMap[i.path]);
    const value = isMulti ? fields : fields[0];

    onChange(value);
  };

  render() {
    return (
      <Options
        isOptionSelected={isOptionSelected}
        getOptionValue={getOptionValue}
        {...this.props}
        options={this.options}
        onChange={this.onChange}
      />
    );
  }
}
