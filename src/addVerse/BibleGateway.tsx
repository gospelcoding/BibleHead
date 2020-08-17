import React, {useState, useRef} from 'react';
import {View} from 'react-native';
import parsePassage, {Passage} from './parsePassage';
import Axios from 'axios';
import BGPassageDisplay from './BGPassageDisplay';
import WebView from 'react-native-webview';
import {newVerse} from '../verses/Verse';
import {useDispatch} from 'react-redux';
import {useT} from '../i18n/i18nReact';
import BHText from '../components/BHText';
import versesSlice, {versesUpdateAction} from '../verseList/versesSlice';

interface IProps {
  done: () => void;
}

export default function BibleGateway(props: IProps) {
  const t = useT();
  const dispatch = useDispatch();
  // const [loading, setLoading] = useState(true);
  const [passage, setPassage] = useState<Passage | null>(null);
  const [lastUrl, setLastUrl] = useState<null | string>(null);

  const webViewRef = useRef<WebView>(null);

  const loadVersePage = async (url: string) => {
    const response = await Axios.get(url);
    const passage = parsePassage(response.data);
    if (passage && passage.text) setPassage(passage);
  };

  const handleNavigationStateChange = (navState: any) => {
    if (navState.url.includes('?search=') && navState.url != lastUrl) {
      loadVersePage(navState.url);
      setLastUrl(navState.url);
    }
  };

  const resetState = () => {
    setPassage(null);
    setLastUrl(null);
  };

  const saveVerse = () => {
    if (passage) {
      const verse = newVerse({
        text: passage.text,
        ...passage.ref,
      });
      dispatch(versesUpdateAction(versesSlice.actions.add([verse])));
      props.done();
      resetState();
    }
  };

  return (
    <View style={{flex: 1}}>
      <WebView
        style={{flex: 1}}
        ref={webViewRef}
        startInLoadingState={true}
        source={{uri: 'https://www.biblegateway.com/passage/'}}
        // useWebKit
        onNavigationStateChange={handleNavigationStateChange}
        renderError={() => <BHText>{t('ConnectionError')}</BHText>}
      />
      {passage && <BGPassageDisplay passage={passage} saveVerse={saveVerse} />}
    </View>
  );
}
