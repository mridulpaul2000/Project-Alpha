import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, {Marker, Callout} from 'react-native-maps';
import getResults from '../hooks/getResults';
import  { requestPermissionsAsync , watchPositionAsync, Accuracy } from 'expo-location';
import { useNavigation } from '@react-navigation/native';
  
const MapScreen = () => {
    const [findAllByType, findAllByName, findById, results, errorMessage] = getResults();
    const [currentLatitude, setCurrentLatitude] = useState(null);
    const [currentLongitude, setCurrentLongitude] = useState(null);
    const [err, setErr] = useState(null);
    const navigation = useNavigation();
    
    const toTitleCase = (str) => {
      return str.replace(
          /\w\S*/g,
          (txt) => {
              return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
          }
      );
     }

    const startWatching = async () => {
        try {
          //setting initial locations as expo location seem to 
          //return null values at certain times
          setCurrentLatitude(23.980857);
          setCurrentLongitude(89.947976); 
          const { granted } = await requestPermissionsAsync();
          await watchPositionAsync ({
            accuracy : Accuracy.BestForNavigation,
            timeInterval : 1000,
            distanceInterval : 10
          }, (location)=> {
              setCurrentLatitude(location.coords.latitude); 
              setCurrentLongitude(location.coords.longitude);
              console.log(currentLatitude + "||" +  currentLongitude);
            });

          if (!granted) {
            throw new Error('Location permission not granted');
          }
        } catch (e) {
          setErr(e);
        }
      };
    
    useEffect ( () => {
        startWatching();
    }, []);

    return ( <View style = {{flex : 1}}>
        <MapView
            style = {styles.map}
            region  = {{
                latitude : currentLatitude,
                longitude : currentLongitude,
                latitudeDelta : 0.01,
                longitudeDelta : 0.01
            }}
            >
                
            {results.map ((item) => (
                <Marker key = {item._id} 
                    coordinate = {{
                        latitude : Number(item.latitude),
                        longitude : Number(item.longitude)
                    }}
                    title = {item.name}
                    description = {item.type}
                    pinColor = {(item.type ==='mall') ? '#C4E2F5' : 
                                    ((item.type ==='restaurant')? '#E9C4F5' : '#F5E7C4')}
                    onCalloutPress = {() => navigation.navigate ('ResultShow', {item : item})}
                >
                  <Callout tooltip>
                    <View style = {styles.bubbleStyle}>
                      { (parseInt(item.currentStrength) < parseInt(item.maxLimit)) ? 
                          <Text style = {styles.nameStyle}>{item.name}</Text> :
                          <Text style = {styles.nameRedStyle}>{item.name}</Text>
                      }
                      <Text>{toTitleCase(item.type)}</Text>
                      { (parseInt(item.currentStrength) < parseInt(item.maxLimit)) ? 
                          <Text style = {styles.shortStyle}>Has Capacity</Text> :
                          <Text style = {styles.shortRedStyle}>No Capacity</Text>
                      }
                    </View>
                    <View style = {styles.arrowBorder} />
                    <View style = {styles.arrow} />
                  </Callout>
                </Marker>
            ))} 
            <Marker
                coordinate = {{
                    latitude : currentLatitude,
                    longitude : currentLongitude
                }}
                pinColor = '#A4ED95'
                title = "You are here"
            ></Marker>
        </MapView>
         { err ? <Text>Please enable location services</Text> : null }
    </View>
    );
};

const styles = StyleSheet.create ({
  map : {
      marginTop : 30,
      height : '100%'
  },
    nameStyle : {
      fontSize : 14,
      fontWeight : 'bold',
      color: "#1E5B7A",
      paddingBottom : 2
  },
  nameRedStyle : {
      fontSize : 14,
      fontWeight : 'bold',
      color: "#E70E0E",
      paddingBottom : 2
  },
  descriptionStyle : {
    fontSize : 12,
    color: "#000",
    fontStyle : 'italic',
    paddingBottom : 2
  },
  shortStyle : {
    fontSize : 11,
    fontWeight : 'bold',
    color: "#00a133",
    fontStyle: "italic"
},
shortRedStyle : {
    fontSize : 11,
    fontWeight : 'bold',
    color: "#E70E0E",
    fontStyle: "italic"
},
bubbleStyle : {
    flexDirection: 'column',
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 6,
    borderColor: '#ccc',
    borderWidth: 0.5,
    padding: 10,
    width: "100%",
  },
  // Arrow below the bubble
  arrow: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#fff',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#007a87',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -0.5,
  },
  imageStyle : {
    width: 50,
    height: 50
  },
});

export default MapScreen;
