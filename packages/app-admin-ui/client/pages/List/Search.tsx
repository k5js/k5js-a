/** @jsx jsx */

import { jsx } from '@emotion/core';
import { useRef, forwardRef, useState, useCallback } from 'react';
import debounce from 'lodash.debounce';

import { SearchIcon, XIcon } from '@k5ui/icons';
// import { Input } from '@k5ui/input';
import { A11yText } from '@k5ui/typography';
import { LoadingSpinner } from '@k5ui/loading';
import { colors } from '@k5ui/theme';
import { uniformHeight } from '@k5ui/common';

import { useListSearch } from './dataHooks';
import { elementOffsetStyles } from './Filters/ActiveFilters';

export default function Search({ isLoading, list }) {
  const { searchValue, onChange, onClear, onSubmit } = useListSearch(list.key);
  const [value, setValue] = useState(searchValue);
  const inputRef = useRef<HTMLInputElement>();

  const hasValue = searchValue && searchValue.length;
  const Icon = hasValue ? XIcon : SearchIcon;
  const isFetching = hasValue && isLoading;

  const onChangeDebounced = useCallback(debounce(onChange, 400), []);

  const handleChange = ({ target: { value } }) => {
    setValue(value);
    onChangeDebounced(value);
  };

  const handleClear = () => {
    if (inputRef.current) inputRef.current.focus();
    setValue('');
    onClear();
  };

  const id = 'ks-list-search-input';

  // NOTE: `autoComplete="off"` doesn't behave as expected on `<input />` in
  // webkit, so we apply the attribute to a form tag here.
  return (
    <form
      css={{ ...elementOffsetStyles, position: 'relative' }}
      autoComplete="off"
      onSubmit={onSubmit}
    >
      <A11yText tag="label" htmlFor={id}>
        Search {list.plural}
      </A11yText>
      <Input
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
        id={id}
        onChange={handleChange}
        placeholder="Search"
        name="item-search"
        value={value}
        type="text"
        ref={inputRef}
        disabled={isFetching}
      />
      <div
        css={{
          alignItems: 'center',
          color: colors.N30,
          cursor: 'pointer',
          display: 'flex',
          height: 34,
          justifyContent: 'center',
          pointerEvents: hasValue ? 'all' : 'none',
          position: 'absolute',
          right: 0,
          top: 0,
          width: 40,
          ':hover': {
            color: hasValue ? colors.text : colors.N30,
          },
        }}
        onClick={hasValue && !isFetching ? handleClear : null}
      >
        {isFetching ? <LoadingSpinner size={16} /> : <Icon />}
      </div>
    </form>
  );
}

type InputProps = {
  autoCapitalize?: string;
  autoComplete?: string;
  autoCorrect?: string;
  id?: string;
  onChange?: $TSFixMe;
  placeholder?: string;
  name?: string;
  value?: $TSFixMe;
  type?: string;
  ref?: $TSFixMe;
};

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => (
  <input
    ref={ref}
    css={{
      ...uniformHeight,
      background: colors.N10,
      border: 0,

      ':focus': {
        background: colors.N15,
        outline: 0,
      },
    }}
    {...props}
  />
));
