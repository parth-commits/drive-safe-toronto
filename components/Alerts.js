import React, {useState} from "react";
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { colors } from "../assets/colors";

/* Device dimensions, use to optimize for device of all sizes */
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


const Alerts = (props) => {

    return (
        <View style={styles.parentView}>
            <Text style={styles.alertsTitle}>Alerts</Text>
            
        </View>
    );
    
    
}


const styles = StyleSheet.create({
    parentView: {
        backgroundColor: colors.darkModeTile,
        width: width - 20,
        borderRadius: 20,
        marginTop: 10,
        height: height/2 -5,
    },
    alertsTitle: {
        marginLeft: 15,
        marginTop: 10,
        color: colors.darkModeText,
        fontFamily: 'mp-bold',
        fontSize: 25,
    },
});


export default Alerts;