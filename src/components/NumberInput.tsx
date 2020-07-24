import React, {useState} from 'react';
import BHTextInput from '../util/BHTextInput';

interface IProps {
  value: number;
  setValue: (v: number) => void;
}

export default function NumberInput(props: IProps) {
  const [cleared, setCleared] = useState(false);
  const text = cleared ? '' : `${props.value}`;

  const setValue = (text: string) => {
    const value = parseInt(text);
    if (isNaN(value)) {
      setCleared(true);
    } else {
      props.setValue(value);
      setCleared(false);
    }
  };

  return (
    <BHTextInput
      value={text}
      onChangeText={setValue}
      keyboardType="numeric"
      selectTextOnFocus
      onBlur={() => setCleared(false)}
      style={{width: 16 * 3, textAlign: 'right'}}
    />
  );
}
