import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapScreen from './src/screens/MapScreen';
import SearchScreen from './src/screens/SearchScreen';
import DetailsShowScreen from './src/screens/DetailsScreen';
import LoadingScreen from './src/screens/LoadingScreen';
import SaveVisitScreen from './src/screens/SaveVisitScreen';
import QRCodeScreen from './src/screens/QRCodeScreen';
import { AntDesign, Feather } from '@expo/vector-icons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const SearchStack = () => {
  return (
    <Stack.Navigator 
      initialRouteName = "Search"
      >
        <Stack.Screen name = "Search" component = {SearchScreen} 
          options = {{title : 'Search Screen', headerShown : false }}/>
        <Stack.Screen name = "ResultShow" component = {DetailsShowScreen} 
          options = {{title : '', headerStyle : { backgroundColor: '#d9d7d7', height : 65}}} />
        <Stack.Screen name = "SaveVisit" component = {SaveVisitScreen} 
          options = {{title : '', headerStyle : { backgroundColor: '#d9d7d7', height : 65}}} />
    </Stack.Navigator>
  );
}

const TabLayout = () => {
  return (
  <Tab.Navigator
    style={{paddingTop: 50}}
    initialRouteName='Search'
    tabBarOptions={tabBarOptions} >
    <Tab.Screen
      name='Search'
      component={SearchStack}
      options={{
        tabBarIcon: ({color}) => (<Feather name="search" size={24} color={color} />)
      }}
    />
    <Tab.Screen
      name='Map'
      component={MapScreen}
      options={{
        tabBarIcon: ({color}) => (<Feather name="map-pin" size={24} color={color} />)
      }}
    />
    <Tab.Screen
      name='QRCode'
      component={QRCodeScreen}
      options={{
        tabBarIcon: ({color}) => (<AntDesign name="qrcode" size={24} color={color} />)
      }}
    />
  </Tab.Navigator>
)};

const tabBarOptions = {
  // showLabel: false,
  activeTintColor: '#0450de',
  inactiveTintColor: '#000',
  keyboardHidesTabBar: true,
  style: {
    backgroundColor: '#d9d7d7',
    paddingTop: 5
  }
};

const App = () => {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return (<LoadingScreen />);
  } else {
    return (
      <NavigationContainer>
        <TabLayout/>
      </NavigationContainer>
    );
  }
};

export default App;
