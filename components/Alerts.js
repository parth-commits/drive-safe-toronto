import React, {useState} from "react";
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native';
import { colors } from "../assets/colors";

/* Device dimensions, use to optimize for device of all sizes */
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const roadIsCleanMessage = "The road isn't bugged with cameras!";
const speedCamAlertMessage = "Approaching speed camera at Richmond St E And Parliament St";
const redLightCamAlertMessage = "Approaching red light camera at Richmond St E And Parliament St";
const Alerts = (props) => {
    /*
    alertImage === 1 means show redLightCamIcon.png
    alertImage === 2 means show speedCamIcon.png
    */
    const [alertImage, setAlertImage] = useState(0);
    const [alertMessage, setAlertMessage] = useState(roadIsCleanMessage);
    
    const changeVar = () => {
        if (alertImage === 1) {
            setAlertImage(2);
            setAlertMessage(speedCamAlertMessage);
        } else if (alertImage === 2) {
            setAlertImage(0);
            setAlertMessage(roadIsCleanMessage);
        } else {
            setAlertImage(1);
            setAlertMessage(redLightCamAlertMessage);
        }
    };
    return (
        <View style={styles.parentView}>
            <Text style={styles.alertsTitle}>Alerts</Text>
            <TouchableOpacity onPress={() => changeVar()} style={styles.tempTouchableOpacity}>
                <View style={styles.alertWrapper}>
                    { (alertImage === 1) && <Image style={styles.alertsImage} source={require('../assets/images/redLightCamIcon.png')}></Image>}
                    { (alertImage === 2) && <Image style={styles.alertsImage} source={require('../assets/images/speedCamIcon.png')}></Image>}
                    { (alertImage === 0) && <Image style={styles.alertsImage} source={require('../assets/images/noCamIcon.png')}></Image>}
                    <View style={styles.textWrapper}>
                        <Text  numberOfLines={2} adjustsFontSizeToFit style={styles.alertText}>{alertMessage}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
}

/* Returns true if the  coordinates are less than 200 meters away. */
function isCloseEnough(coords1, coords2) {
    return haversineFormula(coords1, coords2) < 200;
}

/* The official haversine formula */
function haversineFormula(coords1, coords2) {
    // const pair1 = [43.7429520012624, -79.6000939933117];
    // const pair2 = [43.742520, -79.597469];
    const lat1 = coords1[0];
    const lat2 = coords2[0];
    const lon1 = coords1[1];
    const lon2 = coords2[1];
    const R = 6371e3; // metres
    const φ1 = lat1 * Math.PI/180; // φ, λ in radians
    const φ2 = lat2 * Math.PI/180;
    const Δφ = (lat2-lat1) * Math.PI/180;
    const Δλ = (lon2-lon1) * Math.PI/180;
  
    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  
    const d = R * c; // in metres
    return d
  }

const styles = StyleSheet.create({
    parentView: {
        backgroundColor: colors.darkModeTile,
        width: width - 20,
        borderRadius: 20,
        marginTop: 10,
        height: height/2 -5,
    },
    textWrapper: {
        // height: 100,
        width: width - 40,
    },
    alertText: {
      marginTop: 10,
      color: colors.darkModeText,
      fontFamily: 'mp-bold',
      fontSize: 25,
      textAlign: 'center',

    },
    alertWrapper: {
        alignItems: 'center',
    },
    alertsTitle: {
        marginLeft: 15,
        marginTop: 10,
        color: colors.darkModeText,
        fontFamily: 'mp-bold',
        fontSize: 25,
    },
    alertsImage: {
        height: width - 20 - 100 - 10,
        width: 7*(width - 20 - 100)/6,
    },
    tempTouchableOpacity: {
        height: width - 20 - 100 - 10,
        width: width - 20,
    },
});


export default Alerts;