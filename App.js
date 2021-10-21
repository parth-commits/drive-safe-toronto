import React, {useState} from 'react';
import { StyleSheet, Text, View, Dimensions, StatusBar } from 'react-native';
import AppLoading from 'expo-app-loading';
import { colors } from './assets/colors';
import { useFonts } from 'expo-font';
import * as Font from 'expo-font';
import SpeedView from './components/SpeedView';
import CurrentStreet from './components/CurrentStreet';
import Alerts from './components/Alerts';
import TopBanner from './components/TopBanner';

/* Fonts to load */
let customFonts = {
  'mp-light': require('./assets/fonts/Manrope-Light.ttf'),
  'mp-medium': require('./assets/fonts/Manrope-Medium.ttf'),
  'mp-bold': require('./assets/fonts/Manrope-Bold.ttf'),
  'mp-regular': require('./assets/fonts/Manrope-Regular.ttf'),
};

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function App() {

  /* States */
  const [latitude, setLatitude] = useState(43.788245);
  const [longitude, setLongitude] = useState(-79.681678);
  const [speed, setSpeed] = useState(10);
  const [currentStreet, setCurrentStreet] = useState('Highway 401 the highway of the heros');

  // Load in the fonts
  let [fontsLoaded] = useFonts(customFonts);
  Font.loadAsync(customFonts);

  // Hide the status bar, probably only for android
  StatusBar.setHidden(true);

  if (!fontsLoaded) {
      return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <TopBanner></TopBanner>
        <SpeedView setLatitude={setLatitude} setLongitude={setLongitude} setSpeed={setSpeed} speed={speed}></SpeedView>
        <CurrentStreet latitude={latitude} longitude={longitude} currentStreet={currentStreet} setCurrentStreet={setCurrentStreet}></CurrentStreet>
        <Alerts  latitude={latitude} longitude={longitude}></Alerts>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkModeBackground,
    alignItems: 'center',
    //justifyContent: 'center',
  },
});
