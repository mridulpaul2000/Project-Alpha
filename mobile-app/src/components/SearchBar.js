import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

const SearchBar = ({term, onTermChange, onTermSubmit}) => {
    return <View style = {styles.backgroundStyle}> 
        <Feather name="search" size = {30} style = {styles.iconStyle} />
        <TextInput 
            autoCapitalize = "none"
            autoCorrect = {false}
            style = {styles.inputStyle} 
            placeholder = "Search places"
            value = {term}
            onChangeText = {onTermChange} 
            onEndEditing = {onTermSubmit} />
    </View>
};

const styles = StyleSheet.create ({
    backgroundStyle : {
        marginTop : 40,
        marginBottom: 10,
        backgroundColor : '#DCDCDC',
        height : 45,
        borderRadius : 5,
        marginHorizontal : 15,
        flexDirection: 'row'
    },
    inputStyle : {
        fontSize : 16,
        flex : 1
    },
    iconStyle : {
        fontSize : 35,
        alignSelf : 'center',
        marginHorizontal : 15,
        color : '#9B9595'
    }
});

export default SearchBar;
