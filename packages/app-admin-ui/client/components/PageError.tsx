/** @jsx jsx */
import { jsx } from '@emotion/core';
import React, { ElementType } from 'react';

import { StopIcon } from '@k5ui/icons';
import { colors } from '@k5ui/theme';
import { Container } from '@k5ui/layout';

type Props = {
  children: $TSFixMe;
  Icon: ElementType;
};

export default function PageError({ children, Icon, ...props }: Props) {
  return (
    <Container>
      <div
        css={{
          color: colors.N30,
          fontSize: 24,
          padding: '2em 1em',
          textAlign: 'center',
        }}
        {...props}
      >
        <Icon css={{ height: 48, width: 48 }} />
        {children}
      </div>
    </Container>
  );
}
PageError.defaultProps = {
  Icon: StopIcon,
};
