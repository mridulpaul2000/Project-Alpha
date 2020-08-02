import React, { useState, useEffect } from 'react';
import {View, StyleSheet, Image, AsyncStorage} from 'react-native';
import {Text, Input, Button} from 'react-native-elements';
import Spacer from '../components/Spacer';
import QRCode from 'react-native-qrcode-generator';

const QRCodeScreen = () => {
    const [qrCodeValue, setqrCodeValue]  = useState('');
    const key = 'alphaCFC';
    
    const generateQRCode = async () => {
        const value = await AsyncStorage.getItem(key);
        setqrCodeValue(value);
//        AsyncStorage.removeItem(key);
    }

    const clearStorage = async () => {
        await AsyncStorage.clear();
    }
    
    const returnVariables = (term, varName)=> {
        if(term != null) {
            const startOfString = term.indexOf(varName);
            const lengthOfString = varName.length;
            const start = startOfString + lengthOfString + 1;
            const value = term.substring(start, term.indexOf('&', start));
            return value;    
        }
        else 
            return null;
    }

    useEffect ( () => {
        if(qrCodeValue != null)
            generateQRCode();
    }, []);

    return ( <View style = {styles.containerStyle}>
        <Spacer>
            <Button title = 'Generate QR Code'
                onPress = {() => {generateQRCode()}} />
        </Spacer> 
        <Text style = {styles.noSavedQRStyle}> {(qrCodeValue == null) ? "Please select a premise for visit" : null}</Text>
        <Spacer>
            <>{ (qrCodeValue != null) ? <QRCode value = {qrCodeValue} size = {300} />  : null }</> 
        </Spacer>
        <Spacer> 
            <Text style = {styles.textHeadingStyle}>{returnVariables(qrCodeValue, 'premisename')}</Text>
            <Text style = {styles.textStyle}>Total Guests : {returnVariables(qrCodeValue, 'guests')}</Text>
        </Spacer>
    </View>);

}

const styles = StyleSheet.create({
    containerStyle : {
        marginTop : 50,
        marginLeft : 0
    },
    noSavedQRStyle : {
        fontSize : 15,
        color: "#B21803",
        alignItems : 'center'
    },
    textHeadingStyle : {
        fontSize : 16,
        color : '#1E5B7A',
        fontWeight : 'bold',
        marginBottom : 5
    },
    textStyle : {
        fontSize : 14
    }
});

export default QRCodeScreen;