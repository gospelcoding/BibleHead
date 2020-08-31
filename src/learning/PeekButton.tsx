import React, {ComponentProps} from 'react';
import BHButton from '../components/BHButton';
import {useT} from '../i18n/i18nReact';

interface IProps {
  step: number;
  setPeek: () => void;
  cancelPeek: () => void;
}

export default function PeekButton(props: IProps) {
  const t = useT();

  return (
    <BHButton
      icon="eye"
      // size={36}
      color="yellow"
      onPressIn={props.setPeek}
      onPressOut={props.cancelPeek}
      hidden={props.step == 0 ? true : false}
      onPress={() => {}}
      size="jumbo"
    />
  );
}
