import React, { useEffect, useState } from "react";
import { View, Text, PermissionsAndroid, FlatList } from "react-native";
import Contacts from 'react-native-contacts';
import ImportContactItem from "./ImportContactItem";

const ImportContactList = ({navigation, route}) => {
    const [contacts, setContacts] = useState<any[]>([]);
    useEffect(() => {
        PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
            {
              'title': 'Contacts',
              'message': 'This app would like to view your contacts.',
              'buttonPositive': 'Please accept bare mortal'
            }
          ).then(() => {
            Contacts.getAll().then(contacts => {
                setContacts(contacts);
            })
          })
    }, []);
    return (
        <View>
            <FlatList
                maxToRenderPerBatch={30}
                removeClippedSubviews={true}
                data={contacts}
                renderItem={({item}) => <ImportContactItem item={item}/> }
                keyExtractor={(item, index) => item.recordID.toString()}></FlatList>
        </View>
    )
}

export default ImportContactList;