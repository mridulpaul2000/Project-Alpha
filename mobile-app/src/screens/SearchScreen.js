import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView} from 'react-native';
import SearchBar from '../components/SearchBar';
import getResults  from "../hooks/getResults";
import ResultsList from "../components/ResultsList";

const SearchScreen = (navigation) => {
    const [term, setTerm] = useState ('');
    const [findAllByType, findAllByName, findById, results, errorMessage] = getResults();

    const filterResultsByType = (type) => {
        return results.filter(result => {
            return result.type === type;  
        });
    };

    return <View style = {{flex : 1}}>
        <SearchBar 
            term = {term} 
            onTermChange = {newTerm => setTerm(newTerm)}
            onTermSubmit = {() => findAllByName(term)} />
        {errorMessage ? <Text>{errorMessage}</Text> : null}
        <ScrollView>
            <ResultsList results = {filterResultsByType('mall')} title = "Malls"  />
            <ResultsList results = {filterResultsByType('restaurant')} title = "Restaurants"/>
            <ResultsList results = {filterResultsByType('park')} title = "Parks"/>
        </ScrollView>
    </View>
};

const styles = StyleSheet.create ({
});

export default SearchScreen;
