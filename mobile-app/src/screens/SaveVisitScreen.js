import React, { useState } from 'react';
import {View, StyleSheet, Image, AsyncStorage} from 'react-native';
import {Text, Input, Button} from 'react-native-elements';
import { useRoute } from '@react-navigation/native';
import Spacer from '../components/Spacer';

const SaveVisitScreen = () => {
    const route = useRoute();
    const result = route.params.result;
    const [name, setName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [totalGuests, setTotalGuests] = useState('');
    const [buttonPressed, setButtonPressed] = useState(false);
    const key = 'alphaCFC';
//    const value = 'premiseid=' + result.id + "&premisename=" + result.name + "&premiseaddress=" + result.address + '&guestname=' + name 
//        + '&totalguests=' + totalGuests + '&guestnumber=' + mobileNumber ;
    const value = 'premiseid=' + result.id + '&totalguests=' + totalGuests + "&premisename=" + result.name + "&";

    const saveDataInLocalStorage = async () => {
        await AsyncStorage.setItem(key, value);
        setButtonPressed(true);
        console.log(value);
    }

    return ( <View style = {{flex : 1}}>
        <Text style = {styles.nameStyle}> {result.name}</Text>    
        <Spacer>
            <Input 
                label='Guest Name'
                value = {name}
                onChangeText = { (name) => setName(name) }
                autoCapitalize='none'
                autoCorrect = {false} 
            />
        </Spacer>
        <Spacer>
            <Input 
                label='Mobile Number'
                value = {mobileNumber}
                onChangeText = { (mobileNumber) => setMobileNumber(mobileNumber) }
                autoCapitalize='none'
                autoCorrect = {false} 
            /> 
        </Spacer>
        <Spacer>
            <Input 
                label='Total Guests'
                value = {totalGuests}
                onChangeText = { (totalGuests) => setTotalGuests(totalGuests) }
                autoCapitalize='none'
                autoCorrect = {false} 
            />
        </Spacer>
        <Spacer>
            <Button title = 'Save'
                onPress = {() => saveDataInLocalStorage()} /> 
        </Spacer>
        <Spacer>
            { (buttonPressed) ? <Text style = {styles.savedStyle}>Your visit has been saved.</Text> : null}
        </Spacer>
    </View> 
    );
};

const styles = StyleSheet.create({
    containerStyle : {
        marginLeft : 0
    },
    imageStyle : {
        width : 350,
        height : 150,
        borderRadius : 0,
        marginBottom : 5
    },
    textStyle : {
        fontSize : 16,
        color: "#51595D"
    },
    savedStyle : {
        fontSize : 16,
        color : '#5DB203',
        fontWeight : 'bold',
        alignItems : 'center',
    },
    nameStyle : {
        fontSize : 20,
        fontWeight : 'bold',
        color: "#1E5B7A",
        marginTop : 15,
        marginBottom : 15,
        marginLeft : 5
    },
    fullStyle : {
        color : "#F44336"
    }
});

export default SaveVisitScreen;
