/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useCallback, memo, useState, useEffect } from 'react';

import copyToClipboard from 'clipboard-copy';
import Animation from '../../components/Animation';
import { CheckIcon, ClippyIcon } from '@k5ui/icons';
import { FlexGroup } from '@k5ui/layout';
import { A11yText } from '@k5ui/typography';
import { colors } from '@k5ui/theme';
import { Button } from '@k5ui/button';
import Tooltip from '@k5ui/tooltip';

const CopyIcon = memo<{ isCopied? }>(function CopyIcon({ isCopied }) {
  return isCopied ? (
    <Animation name="pulse" duration="500ms">
      <CheckIcon css={{ color: colors.create }} />
    </Animation>
  ) : (
    <ClippyIcon />
  );
});

export const IdCopy = memo<{ id? }>(function IdCopy({ id }) {
  const [isCopied, setIsCopied] = useState(false);
  const onSuccess = useCallback(() => {
    setIsCopied(true);
  }, []);

  useEffect(() => {
    if (isCopied) {
      const timeoutID = setTimeout(() => {
        setIsCopied(false);
      }, 500);
      return () => {
        clearTimeout(timeoutID);
      };
    }
  }, [isCopied, setIsCopied]);

  return (
    <FlexGroup align="center" isContiguous isInline>
      <div
        css={{
          color: colors.N30,
          fontFamily: 'Monaco, Consolas, monospace',
          fontSize: '0.85em',
        }}
      >
        ID: {id}
      </div>
      <Tooltip content="Copy ID" hideOnMouseDown hideOnKeyDown>
        {ref => (
          <Button
            ref={ref}
            onClick={() => {
              copyToClipboard(id).then(onSuccess);
            }}
            variant="subtle"
          >
            <div css={{ width: 16 }}>
              <CopyIcon isCopied={isCopied} />
            </div>
            <A11yText>Copy ID</A11yText>
          </Button>
        )}
      </Tooltip>
    </FlexGroup>
  );
});
