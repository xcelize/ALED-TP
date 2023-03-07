import React, { useEffect, useState } from "react";
import { View, Text, PermissionsAndroid, FlatList, ActivityIndicator, Platform } from "react-native";
import Contacts from 'react-native-contacts';
import ImportContactItem from "./ImportContactItem";

const ImportContactList = ({navigation, route}) => {
    const [contacts, setContacts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      if (Platform.OS == 'android') {
        PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
          title: 'Contacts',
          message: 'This app would like to view your contacts.',
          buttonPositive: 'bottom',
        }).then(() => {
          loadContacts();
        })
      }
    }, []);

    const loadContacts = () => {
      Contacts.getAll().then(contacts => {
        setContacts(contacts.sort((a, b) => a.givenName.localeCompare(b.givenName)));
        setLoading(false);
      }).catch(e => {
        setLoading(false);
      })
    }

    if (!loading) {
      return(
        <View>
              <FlatList
                  maxToRenderPerBatch={30}
                  removeClippedSubviews={true}
                  data={contacts}
                  renderItem={({item}) => <ImportContactItem item={item}/> }
                  keyExtractor={(item, index) => item.recordID.toString()}></FlatList>
        </View>
      )
    } else {
      return (
        <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'row'}}>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      )
    }
}

export default ImportContactList;