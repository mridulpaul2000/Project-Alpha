import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const ResultsDetail = ({result}) => {
    let status = "";
    if (result.currentStrength >= result.maxLimit) {
 //       status = "NOW FULL";
    }

    return <View style = {styles.containerStyle}>
        <Image style = {styles.imageStyle} source = {{ uri : `https://picsum.photos/180/110?${result.name}`}} />
        {(parseInt(result.currentStrength) < parseInt(result.maxLimit)) ?
            <Text style = {styles.nameStyle}> {result.name}</Text>
        :   <Text style = {styles.nameRedStyle}> {result.name}</Text>
        }
        <Text style = {styles.textStyle}> Max Limit : {result.maxLimit}</Text>
        <Text style = {styles.textStyle}> Current Strength : {result.currentStrength}</Text>
        <Text style = {styles.textStyle}> {status} </Text> 
    </View> 
};

const styles = StyleSheet.create({
    containerStyle : {
        marginLeft : 15
    },
    imageStyle : {
        width : 180,
        height : 110,
        borderRadius : 4,
        marginBottom : 5
    },
    textStyle : {
        fontSize : 13,
        color: "#51595D"
    },
    nameStyle : {
        fontSize : 14,
        fontWeight : 'bold',
        color: "#1E5B7A"   
    },
    nameRedStyle : {
        fontSize : 14,
        fontWeight : 'bold',
        color: "#E70E0E"
    },
    fullStyle : {
        color : "#F44336"
    }
});

export default ResultsDetail;