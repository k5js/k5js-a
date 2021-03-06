/** @jsx jsx */

import { jsx } from '@emotion/core';
import { borderRadius, gridSize, shadows } from '@k5ui/theme';

// ==============================
// Card
// ==============================

export const Card = ({ as: Tag, elevation, isInteractive, isPadded, ...props }) => {
  const shadow = shadows[elevation];
  return (
    <Tag
      css={{
        background: 'white',
        borderRadius: borderRadius,
        boxShadow: shadow,
        padding: isPadded ? gridSize * 2 : null,
        transition: `box-shadow 111ms ease-out, transform 111ms ease-out`,

        ':hover': isInteractive
          ? { boxShadow: shadows[elevation + 1], transform: 'translateY(-2px)' }
          : null,
        ':active': isInteractive ? { boxShadow: shadow, transform: 'none' } : null,
      }}
      {...props}
    />
  );
};

Card.defaultProps = {
  as: 'div',
  elevation: 0,
  isPadded: true,
};

// ==============================
// Canvas
// ==============================

export const Canvas = ({ as: Tag, isPadded, ...props }) => {
  return (
    <Tag
      css={{
        background: `rgba(9, 30, 66, 0.04)`,
        borderRadius: borderRadius * 2,
        padding: isPadded ? gridSize : null,
      }}
      {...props}
    />
  );
};

Canvas.defaultProps = {
  as: 'div',
  isPadded: true,
};
