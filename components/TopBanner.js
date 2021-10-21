import React, {useState, useEffect} from "react";
import { StyleSheet, Text, View, Dimensions, Touchable, TouchableOpacity, Image } from 'react-native';
import { colors } from "../assets/colors";
import Info from "./Info";
/* Device dimensions, use to optimize for device of all sizes */
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const greetingTypes = ['Good Early Morning!', 'Good Morning!', 'Good Afternoon!', 'Good Evening!'];

const TopBanner = (props) => {
    const [greeting, setGreeting] = useState('Good Early Morning!');
    const [infoModalVisible, setInfoModalVisible] = useState(false);
    useEffect(() => {
        const currHours = new Date().getHours();
        
        if (currHours < 7) {
            setGreeting(greetingTypes[0]);
        } else if (currHours < 12) {
            setGreeting(greetingTypes[1]);
        } else if (currHours < 18) {
            setGreeting(greetingTypes[2]);
        } else {
            setGreeting(greetingTypes[3]);
        }
        
        
      }, []);
    return (
        <View style={styles.parentView}>
            {infoModalVisible && (<Info infoModalVisible={infoModalVisible} setInfoModalVisible={setInfoModalVisible}></Info>)}
            <View style={styles.greetings}>
                <Text  numberOfLines={1} adjustsFontSizeToFit style={styles.greeting}>{greeting}</Text>
            </View>
            <View style={styles.topButton}>
                <TouchableOpacity style={styles.topButton} onPress={() => setInfoModalVisible(true)}>
                    <Image style={styles.topButtonIcon} source={require('../assets/images/InfoIcon.png')}></Image>
                </TouchableOpacity>
            </View>
        </View>
    );
    
    
}


const styles = StyleSheet.create({
    parentView: {
        // backgroundColor: colors.darkModeTile,
        width: width - 20,
        borderRadius: 10,
        marginTop: 10,
        height: 75,
        flexDirection: 'row',
    },
    greetings: {
        width: width - 20 - 75,
        height: 75,
        justifyContent: 'center',
    },
    greeting: {
        color: colors.darkModeText,
        fontFamily: 'mp-bold',
        fontSize: 30,
    },
    topButton: {
        height: 75,
        width: 75,
        //backgroundColor: colors.darkModeTile,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    topButtonIcon: {
        width: 50,
        height: 50,

    },
});


export default TopBanner;