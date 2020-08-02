import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import ResultsDetail from "../components/ResultsDetail";
import { useNavigation } from '@react-navigation/native';

const ResultsList = ({results, title}) => {
  const navigation = useNavigation();

  if (!results.length)  {
    return null;
  }

  return <View style = {styles.containerStyle}>
      <Text style = {styles.titleStyle}>{title}</Text>        
      <FlatList
        horizontal
        showsHorizontalScrollIndicator = {false}
        data = {results}
        keyExtractor = {(results) => results._id}
        renderItem = { ({item}) => {
          return <TouchableOpacity
            onPress = {() => navigation.navigate ('ResultShow', {item : item})}> 
            <ResultsDetail result = {item} />
          </TouchableOpacity>
        }} 
      />
  </View>  
};

const styles  = StyleSheet.create({
    titleStyle : {
        fontSize : 16,
        fontWeight : "bold",
        marginLeft : 15,
        marginTop : 0,
        marginBottom : 5,
        color : "#0781BE"

    },
    containerStyle : {
      marginTop : 0,
      marginBottom : 0
    } 
});

export default ResultsList;


