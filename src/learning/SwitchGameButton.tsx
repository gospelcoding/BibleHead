import React from 'react';
import {View, Image} from 'react-native';
import BHTouchable from '../components/BHTouchable';
import {LearnGame, settingsSlice} from '../settings/Settings';
import {useDispatch} from 'react-redux';

interface IProps {
  game: LearnGame;
}

export default function SwitchGameButton(props: IProps) {
  const dispatch = useDispatch();

  const buttonParams = getButtonParams(props.game);
  return (
    <View style={{flexDirection: 'row'}}>
      {buttonParams.map((params) => (
        <View style={{padding: 8}} key={params.game}>
          <BHTouchable
            onPress={() => dispatch(settingsSlice.actions.toggleLearnGame())}>
            <Image source={params.imgSource} />
          </BHTouchable>
        </View>
      ))}
    </View>
  );
}

function getButtonParams(currentGame: LearnGame) {
  let buttonParams = [];
  if (currentGame != 'HideWords')
    buttonParams.push({
      game: 'HideWords',
      imgSource: require('./hidewords.png'),
    });
  if (currentGame != 'ShuffleWords')
    buttonParams.push({
      game: 'ShuffleWords',
      imgSource: require('./cards.png'),
    });
  return buttonParams;
}
