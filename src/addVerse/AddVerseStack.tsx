import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import RefEditorScreen from './RefEditorScreen';
import TextEntry from './TextEntry';
import {NavigationProp} from '@react-navigation/native';

interface IProps {
  navigation: NavigationProp<any, any>;
}

const Stack = createStackNavigator();

export default function AddVerseStack({navigation}: IProps) {
  const doneAddingVerse = () => {
    navigation.navigate('VerseList');
  };

  return (
    <Stack.Navigator>
      <Stack.Screen name="RefEditor" component={RefEditorScreen} />
      <Stack.Screen name="TextEntry" component={TextEntry} />
    </Stack.Navigator>
  );
}
