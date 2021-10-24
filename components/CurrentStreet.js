import React, {useState, useEffect} from "react";
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";
import { colors } from "../assets/colors";
import Experiment from "./Experiment";

/* Device dimensions, use to optimize for device of all sizes */
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


const CurrentStreet = (props) => {
  const [experimentModalVisible, setExperimentModalVisible] = useState(false);
  /* For what road you are currently on tile */
  useEffect(() => {
    let url = `https://nominatim.openstreetmap.org/reverse.php?lat=${props.latitude}&lon=${props.longitude}&zoom=16&format=jsonv2`;
      fetch(url)
      .then(response => response.text())
      .then((responseData) => {
          // console.log('running');
        let temp = JSON.parse(responseData);
        if (temp.name !== props.currentStreet) {
          props.setCurrentStreet(temp.name);
        } else {
          // console.log('same as before')
        }
      }).catch(function () {
        // console.log("Promise Rejected");
      });
    }, [props.latitude, props.longitude]); // when latitude or longitude changes, then check for new street name possibly, after 5 secs

    return (
        <View style={styles.parentView}>
          { experimentModalVisible && <Experiment setExperimentModalVisible={setExperimentModalVisible} experimentModalVisible={experimentModalVisible}></Experiment>}
          <TouchableOpacity onPress={() => setExperimentModalVisible(true)}>
            <Image source={require('../assets/images/ExperimentIcon.png')} style={styles.currentStreetViewIcon}></Image>
          </TouchableOpacity>
          <Image source={require('../assets/images/LocationIcon.png')} style={styles.currentStreetViewIcon}></Image>
          <Text  numberOfLines={1} adjustsFontSizeToFit  style={styles.currentStreetViewText}>{props.currentStreet}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    parentView: {
        backgroundColor: colors.darkModeTile,
        width: width - 20,
        borderRadius: 40,
        marginTop: 10,
        height: 45,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    currentStreetViewIcon: {
        width: 25,
        height: 25,
        paddingLeft: 5,
    },
    currentStreetViewText: {
        maxWidth: width - 50,
        fontSize: 23,
        textAlign: 'center',
        fontFamily: 'mp-bold',
        paddingLeft: 5,
        color: colors.darkModeText,
    },
});

export default CurrentStreet;