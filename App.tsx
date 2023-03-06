/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {StyleSheet} from 'react-native';

import ContactList from './Components/ContactList';
import {Provider} from 'react-redux';
import {persistor, store} from './Store/Configure';
import {PersistGate} from 'redux-persist/integration/react';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ContactsList from './Components/ContactList';
import ImportContactList from './Components/ImportContactList';
import Toast from 'react-native-toast-message';


const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}></PersistGate>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Listes des contacts">
          <Stack.Screen name="Listes des contacts" component={ContactsList}  options={ {headerShown: false} } />
          <Stack.Screen name="Importez des contacts" component={ImportContactList} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </Provider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
