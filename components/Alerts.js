import React, {useState, useEffect} from "react";
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native';
import { colors } from "../assets/colors";
import { speedCamData } from '../assets/datapoints/speed-cam-data-simplified.js';
import { redLightCamData } from "../assets/datapoints/red-light-cam-data-simplified.js";

/* Device dimensions, use to optimize for device of all sizes */
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const roadIsCleanMessage = "The road isn't bugged with cameras!";
const speedCamAlertMessagePrefix = "Speed camera nearby at";
const redLightCamAlertMessagePrefix = "Red light camera near by at";
const Alerts = (props) => {
    /*
    alertImage === 1 means show redLightCamIcon.png
    alertImage === 2 means show speedCamIcon.png
    */
    const [alertImage, setAlertImage] = useState(1);
    const [alertMessage, setAlertMessage] = useState(redLightCamAlertMessagePrefix);
    
    const changeAlert = (int, str) => {
        setAlertImage(int);
        setAlertMessage(str);
        /* if (alertImage === 1) {
            setAlertImage(2);
            setAlertMessage(speedCamAlertMessage);
        } else if (alertImage === 2) {
            setAlertImage(0);
            setAlertMessage(roadIsCleanMessage);
        } else {
            setAlertImage(1);
            setAlertMessage(redLightCamAlertMessage);
        }*/
    };

    useEffect(() => {
        //console.log('this runs');
        console.log(`longitude: ${props.longitude} | latitude: ${props.latitude}`);
        let speedReturn = checkSpeedCam(props.latitude, props.longitude);
        let redLightReturn = checkRedLightCam(props.latitude, props.longitude);
        console.log(speedReturn);
        console.log(redLightReturn);
        if ((!speedReturn)||(!redLightReturn)) {
            console.log('nothing sign');
            changeAlert(0, roadIsCleanMessage);
        }

    }, [props.latitude, props.longitude]);

    function checkSpeedCam(latitude, longitude) {
        const pair1 = [latitude, longitude];
        for (let i = 0; i < redLightCamData.length; i++) {
            const element = redLightCamData[i];
            if (isCloseEnough(pair1, [element["latitude"], element["longitude"]])) {
                changeAlert(2, `${speedCamAlertMessagePrefix} ${element["location"]}`);
                return true;
            }
        }
        return false;
    }
    
    function checkRedLightCam(latitude, longitude) {
        const pair1 = [latitude, longitude];
        for (let i = 0; i < redLightCamData.length; i++) {
            const element = redLightCamData[i];
            if (isCloseEnough(pair1, [element["latitude"], element["longitude"]])) {
                changeAlert(1, `${redLightCamAlertMessagePrefix} ${element["name"]}`);
                return true;
            }
        }
        return false;
    }

    return (
        <View style={styles.parentView}>
            <Text style={styles.alertsTitle}>Alerts</Text>
            <View style={styles.alertWrapper}>
                { (alertImage === 1) && <Image style={styles.alertsImage} source={require('../assets/images/redLightCamIcon.png')}></Image>}
                { (alertImage === 2) && <Image style={styles.alertsImage} source={require('../assets/images/speedCamIcon.png')}></Image>}
                { (alertImage === 0) && <Image style={styles.alertsImage} source={require('../assets/images/noCamIcon.png')}></Image>}
                <View style={styles.textWrapper}>
                    <Text  numberOfLines={2} adjustsFontSizeToFit style={styles.alertText}>{alertMessage}</Text>
                </View>
            </View>
        </View>
    );
}

/* Returns true if the  coordinates are less than 200 meters away. */
function isCloseEnough(coords1, coords2) {
    let ret = haversineFormula(coords1, coords2);
    return ret < 200;
}

/* The official haversine formula */
function haversineFormula(coords1, coords2) {
    // coords1 = [latitude1, longitude1], coords2 = [latitude2, longitude2]
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