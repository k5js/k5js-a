import * as React from 'react';
import { Button } from '@ksjs-ui/button';

const Page = props => {
  const handleClick = () => {
    if (props.onClick) {
      props.onClick(props.value);
    }
  };

  return <Button {...props} onClick={handleClick} />;
};

export default Page;
