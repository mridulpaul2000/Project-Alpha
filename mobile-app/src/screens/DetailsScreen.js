import React from 'react';
import { View , Text, Image, StyleSheet, Button } from 'react-native';
import { useRoute,useNavigation } from '@react-navigation/native';
import Spacer from '../components/Spacer';
import { ScrollView } from 'react-native-gesture-handler';

const DetailsScreen = () => {
    
    const navigation = useNavigation();
    const route = useRoute();
    const result = route.params.item;
    const maxOut = (parseInt(result.currentStrength) < parseInt(result.maxLimit) ? false : true);

    return <View style = {{flex : 1}}>
        <Image style = {styles.imageStyle} source = {{ uri : `https://picsum.photos/350/150?${result.name}`}} />
        <ScrollView>
            <Spacer>
            {(maxOut) ? 
                <Text style = {styles.nameRedStyle}> {result.name}</Text> :
                <Text style = {styles.nameStyle}> {result.name}</Text>
            }
            </Spacer>
            <Spacer>
                <Text style = {styles.textStyle}> Max Limit : {result.maxLimit}</Text>
                <Text style = {styles.textStyle}> Current Strength : {result.currentStrength}</Text>
                <Text style = {styles.textStyle}> {result.description}</Text>
            </Spacer>
            <Spacer>
                <Text style = {styles.headingStyle}>General Instructions: </Text>
                <Text style = {styles.textStyle}> {result.instructions} </Text>
            </Spacer>
            <Spacer>
            <Button title = 'Wish to Visit?'
                onPress = {() => navigation.navigate ('SaveVisit', {result : result})} 
                disabled = {maxOut}
                /> 
            </Spacer>
        </ScrollView>
    </View>
}

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
    headingStyle : {
        fontSize : 16,
        fontWeight : 'bold',
        color: "#51595D",
        alignItems : 'center'
    },
    textStyle : {
        fontSize : 15,
        color: "#51595D",
        alignItems : 'center'
    },
    nameStyle : {
        fontSize : 20,
        fontWeight : 'bold',
        color: "#1E5B7A"
    },
    nameRedStyle : {
        fontSize : 20,
        fontWeight : 'bold',
        color: "#E70E0E"
    },
    fullStyle : {
        color : "#F44336"
    }
});

export default DetailsScreen;