import { borderRadius, gridSize } from '@k5ui/theme';

export const uniformHeight = {
  appearance: 'none',
  background: 'none',
  border: '1px solid transparent',
  borderRadius: borderRadius,
  boxSizing: 'border-box',
  fontFamily: 'inherit',
  fontSize: '1.0rem',
  lineHeight: '1.2rem',
  margin: 0,
  minWidth: 1,
  padding: `${gridSize}px ${gridSize * 1.5}px`,
  transition: 'box-shadow 100ms linear',
  verticalAlign: 'middle',
  whiteSpace: 'nowrap',
};

import * as mediaQueries from './media-queries';

export { mediaQueries };
