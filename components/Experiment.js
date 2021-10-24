import React, {useState, useEffect} from "react";
import { StyleSheet, Text, View, Dimensions, Modal, Pressable, Button, TouchableOpacity, TouchableWithoutFeedback, Image, Touchable } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import { colors } from "../assets/colors";

/* Device dimensions, use to optimize for device of all sizes */
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;



const Experiment = (props) => {
 
    return (
        <Modal
          animationType="fade"
          transparent={true}
          visible={props.experimentModalVisible}
          onRequestClose={() => {
            props.setExperimentModalVisible(!props.experimentModalVisible);
          }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={styles.titleList}>
                        <Image source={require('../assets/images/ExperimentIcon.png')} style={styles.inlineImg}></Image>
                        <Text style={styles.experimentModalTitle}>Experiment Lab</Text>

                    </View>
                    
                    <View style={styles.scrollV}>
                    <ScrollView>
                        <View style={styles.experimentModalItem}>
                            <Text style={styles.experimentModalItemTitle}>This is an experimental feature</Text>
                            <Text style={styles.experimentModalItemText}>It may not work correctly at times. Please report to the developer if it isn't working frequently.</Text>
                        </View>
                    </ScrollView>
                    </View>
                    
                    
                    <View style={styles.bottomList}>
                        <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => props.setExperimentModalVisible(!props.experimentModalVisible)}
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
    titleList: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginLeft: -10,
    },
    currentStreetViewIcon: {
        width: 40,
        height: 40,
    },
    inlineImg: {
        width: 60,
        height: 60,
    },
    experimentModalItem: {
        marginTop: 10,
    },
    scrollV: {
        height: height*0.55,
    },
    experimentModalItemText: {
        fontSize: 15,
        fontFamily: 'mp-medium',
        color: colors.darkModeText,
    },
    experimentModalItemTitle: {
        fontSize: 20,
        fontFamily: 'mp-bold',
        color: colors.darkModeText,
    },
    experimentModalTitle: {
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


export default Experiment;