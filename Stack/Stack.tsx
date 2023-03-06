import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ContactsList from '../Components/ContactList';
import ImportContactList from '../Components/ImportContactList';

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={ContactsList}
        />
        <Stack.Screen name="Profile" component={ImportContactList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};