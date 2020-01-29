/** @jsx jsx */

import { jsx, keyframes } from '@emotion/core';
import { forwardRef, useEffect, useRef, useState } from 'react';

import { SearchIcon, XIcon } from '@ksjs-ui/icons';
import { IconButton } from '@ksjs-ui/button';
import { A11yText } from '@ksjs-ui/typography';
import { colors } from '@ksjs-ui/theme';
import { uniformHeight } from '@ksjs-ui/common';
import Tooltip from '@ksjs-ui/tooltip';

import { useAdminMeta } from '../../providers/AdminMeta';
import { useRouter } from '../List/dataHooks';

export function Search({ list }) {
  // const { urlState } = useListUrlState(list.key);
  const [value, setValue] = useState('');
  const [formIsVisible, setFormVisible] = useState(false);
  const inputRef = useRef(null);
  const { history } = useRouter();
  const { adminPath } = useAdminMeta();

  const showForm = () => {
    setFormVisible(true);
  };
  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [formIsVisible]);

  const handleChange = event => {
    setValue(event.target.value);
  };
  const handleClear = () => {
    if (inputRef.current) inputRef.current.focus();
    setValue('');
  };

  const handleSubmit = event => {
    if (event) event.preventDefault();
    history.push(`${adminPath}/${list.path}/?search=${value}`);
  };

  const hasValue = value && value.length;
  const Icon = value ? XIcon : SearchIcon;

  const id = 'ks-list-search-input';

  // NOTE: `autoComplete="off"` doesn't behave as expected on `<input />` in
  // webkit, so we apply the attribute to a form tag here.
  return formIsVisible ? (
    <form
      css={{ display: 'inline-block', position: 'relative' }}
      autoComplete="off"
      onSubmit={handleSubmit}
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
      >
        <Icon onClick={hasValue ? handleClear : null} />
      </div>
    </form>
  ) : (
    <Tooltip content="Search" hideOnMouseDown hideOnKeyDown>
      {ref => (
        <IconButton ref={ref} iconSize={16} variant="subtle" icon={SearchIcon} onClick={showForm} />
      )}
    </Tooltip>
  );
}

const slideOpen = keyframes`
  from {
    width: 42px;
  }
  to {
    width: 160px;
  }
`;
const Input = forwardRef((props, ref) => (
  <input
    ref={ref}
    css={{
      ...uniformHeight,
      animation: `${slideOpen} 180ms cubic-bezier(0.2, 0, 0, 1)`,
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
