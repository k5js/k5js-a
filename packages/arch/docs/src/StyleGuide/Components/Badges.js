import React, { Fragment } from 'react';

import { Badge } from '@k5ui/badge';
import { FlexGroup } from '@k5ui/layout';

const appearances = ['default', 'primary', 'created', 'warning', 'danger', 'inverted'];
const BadgeGuide = () => (
  <Fragment>
    <h2>Badges</h2>
    <h4>Variant: Subtle</h4>
    <FlexGroup>
      {appearances.map(a => (
        <Badge value={55} appearance={a} key={a} />
      ))}
    </FlexGroup>
    <h4>Variant: Bold</h4>
    <FlexGroup>
      {appearances.map(a => (
        <Badge value={55} variant="bold" appearance={a} key={a} />
      ))}
    </FlexGroup>
  </Fragment>
);

export default BadgeGuide;
