import React, {ComponentProps} from 'react';
import BHButton from './BHButton';
import XPlatformIcon from './XPlatformIcon';

interface IProps extends ComponentProps<typeof BHButton> {
  name: string;
  size?: number;
}

export default function BHIconButton(props: IProps) {
  const {name, size, ...otherProps} = props;

  return (
    <BHButton {...otherProps}>
      <XPlatformIcon name={name} size={size} />
    </BHButton>
  );
}
