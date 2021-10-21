import React, {useState, useEffect} from "react";
import { StyleSheet, Text, View, Dimensions, Modal, Pressable, Button, TouchableOpacity, TouchableWithoutFeedback, Image, Touchable } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import { colors } from "../assets/colors";

/* Device dimensions, use to optimize for device of all sizes */
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;



const Info = (props) => {
 
    return (
        <Modal
          animationType="fade"
          transparent={true}
          visible={props.infoModalVisible}
          onRequestClose={() => {
            props.setInfoModalVisible(!props.infoModalVisible);
          }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.infoModalTitle}>Info</Text>
                    <View style={styles.scrollV}>
                    <ScrollView>
                        <View style={styles.infoModalItem}>
                            <Text style={styles.infoModalItemTitle}>Purpose of App</Text>
                            <Text style={styles.infoModalItemText}>This app will give you alerts when you are near a red light camera intersection or a speed camera area. This will help you to take precautions while driving.</Text>
                        </View>

                        <View style={styles.infoModalItem}>
                            <Text style={styles.infoModalItemTitle}>Current Street Details</Text>
                            <Text style={styles.infoModalItemText}>The 2nd tile from the bottom shows what street you currently are on
                            . This is still an experimental feature and may not work properly.</Text>
                        </View>
                        <View style={styles.infoModalItem}>
                            <Text style={styles.infoModalItemTitle}>About the developer</Text>
                            <Text style={styles.infoModalItemText}>This App was made by Parth Patel. </Text>
                            <Text style={styles.infoModalItemText}>Made with <Image style={styles.inlineImg} source={require('../assets/images/heartIcon.png')}></Image> in Canada </Text>
                        </View>
                    </ScrollView>
                    </View>
                    
                    
                    <View style={styles.bottomList}>
                        <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => props.setInfoModalVisible(!props.infoModalVisible)}
                        >
                            <Text style={styles.textStyle}>Close</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
}


const styles = StyleSheet.create({
    inlineImg: {
        width: 20,
        height: 20,
    },
    infoModalItem: {
        marginTop: 10,
    },
    scrollV: {
        height: height*0.55,
    },
    infoModalItemText: {
        fontSize: 15,
        fontFamily: 'mp-medium',
        color: colors.darkModeText,
    },
    infoModalItemTitle: {
        fontSize: 20,
        fontFamily: 'mp-bold',
        color: colors.darkModeText,
    },
    infoModalTitle: {
        fontSize: 30,
        fontFamily: 'mp-bold',
        color: colors.darkModeText,
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: '#111111cc',
    },
    modalView: {
        backgroundColor: colors.darkModeBackground,
        opacity: 1,
        width: width - 40,
        height: height*0.75,
        margin: 20,
        borderRadius: 20,
        padding: 35,
        // alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 30,
        padding: 12,
        elevation: 2,
        marginLeft: 10,
      },
      buttonOpen: {
        backgroundColor: colors.darkModeText,
      },
      buttonClose: {
          backgroundColor: colors.darkModeText,
      },
      textStyle: {
        color: colors.darkModeBackground,
        textAlign: "center",
        fontFamily: 'mp-bold',
        fontSize: 20,
      },
      
    bottomList: {
        //backgroundColor: '#ccc',
        width: width - 110,
        marginRight: 10,
        height: 40,
        position: 'absolute',
        bottom: 10,
        right: 0,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
    },
  });


export default Info;