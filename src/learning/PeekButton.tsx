import React, {ComponentProps} from 'react';
import BHButton from '../components/BHButton';
import ThemeColors from '../util/ThemeColors';
import BHIconButton from '../components/BHIconButton';

interface IProps extends ComponentProps<typeof BHButton> {
  step: number;
  setPeek: () => void;
  cancelPeek: () => void;
}

export default function PeekButton(props: IProps) {
  let {step, ...otherProps} = props;

  return (
    <BHIconButton
      name="eye"
      size={36}
      color={ThemeColors.yellow}
      onPressIn={props.setPeek}
      onPressOut={props.cancelPeek}
      hidden={step == 0 ? true : false}
      {...otherProps}
    />
  );
}
