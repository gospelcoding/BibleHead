import React from 'react';
import {TextStyle, Text, StyleProp} from 'react-native';

interface IProps {
  text: string;
  pattern: string | number;
  style?: StyleProp<TextStyle>;
  highlightStyle: StyleProp<TextStyle>;
}

export default function HighlightText(props: IProps) {
  const pattern = new RegExp(`(${props.pattern})`, 'g');
  const pieces = props.text.split(pattern);

  return <BaseHighlightText pieces={pieces} {...props} />;
}

interface BaseIProps {
  pieces: string[];
  style?: StyleProp<TextStyle>;
  highlightStyle: StyleProp<TextStyle>;
}

export function BaseHighlightText(props: BaseIProps) {
  // Even pieces are regular text - odd pieces should be highlighted
  return (
    <Text style={props.style}>
      {props.pieces.map((piece, index) => (
        <Text key={index} style={index % 2 == 0 ? {} : props.highlightStyle}>
          {piece}
        </Text>
      ))}
    </Text>
  );
}
