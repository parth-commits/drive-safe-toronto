import React, {useState} from "react";
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { colors } from "../assets/colors";
const { useEffect } = React;
import * as Location from 'expo-location';

/* Device dimensions, use to optimize for device of all sizes */
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


const SpeedView = (props) => {
    Location.installWebGeolocationPolyfill()
    Location.requestForegroundPermissionsAsync();
    /* Updates speed, latitude and longitude */
    useEffect(() => {
        // console.log('hi')
        _getLocationAsync = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                // console.log('debieeed')
            }
            let locations = await Location.watchPositionAsync(
            { accuracy: Location.Accuracy.BestForNavigation, timeInterval: 500, distanceInterval: 1 },
            (position) => {
                // console.log(position.coords.speed);
                let lat = position.coords.latitude;
                props.setLatitude(lat);
                let long = position.coords.longitude;
                props.setLongitude(long);
                let speed = (position.coords.speed)*3.6;
                props.setSpeed(Math.round(speed));
            }
            );
        }
        _getLocationAsync();
    }, [])

    return (
        <View style={styles.parentView}>
            <View style={styles.mainSpeedWrapper}>
                <Text adjustsFontSizeToFit  style={styles.mainSpeed}>{props.speed}</Text>
            </View>
            <View style={styles.kmhWrapper}>
                <Text style={styles.kmh}>KM/H</Text>
            </View>
        </View>
    );
    
    
}


const styles = StyleSheet.create({
    parentView: {
        backgroundColor: colors.darkModeTile,
        width: width - 20,
        borderRadius: 20,
        marginTop: 10,
        height: height/2 - 165,
        alignItems: 'center',
    },
    mainSpeedWrapper: {
        width: width - 40,
        height: height/2 - 235,
        marginTop: 10,
        alignItems: 'center',
        zIndex: 1,
        overflow: 'visible',
    },
    kmhWrapper: {
        width: width - 40,
        height: 40,
        marginTop: 10,
        alignItems: 'center',
        zIndex: 0,
    },
    mainSpeed: {
        width: width - 40,
        height: height/2 - 235,
        fontSize: 200,
        overflow: 'visible',
        lineHeight: 200,
        color: colors.darkModeText,
        textAlign: 'center',
    },
    kmh: {
        width: 177,
        fontSize: 30,
        lineHeight: 30,
        marginRight: 2,
        fontFamily: 'mp-bold',
        color: colors.darkModeText,
        textAlign: 'center',
        justifyContent: 'flex-end',

    },
});


export default SpeedView;