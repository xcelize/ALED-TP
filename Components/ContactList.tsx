import React, {useEffect, useState} from 'react';
import {FlatList, Image, PermissionsAndroid, Pressable, StyleSheet, Text, View} from 'react-native';
import {Contact} from '../Types/Contact';
import {useDispatch, useSelector} from 'react-redux';
import {AnyAction} from 'redux';
import ContactItem from './ContactItem';
import ModalForm from './ModalForm';
import { Icon } from 'react-native-elements';


const ContactsList = ({navigation}) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [modalState, setModalState] = useState(false);
  const dispach = useDispatch();
  const contactReducer = useSelector((state: AnyAction) => state.contacts);

  useEffect(() => {
    setContacts(contactReducer.contactList);
  }, [contactReducer]);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Safety</Text>
            <Text style={styles.subtitle}>Vivre mieux</Text>
          </View>
          <View style={styles.actionButtons}>
            <Icon
                raised
                name='add'
                color='#f50'
                onPress={() => setModalState(!modalState)} />
            <Icon
                raised
                name='event'
                color='#f50'
                onPress={() => navigation.navigate("Importez des contacts")} />
          </View>
        </View>
        <View style={styles.flatlist}>
          <FlatList
            style={{ marginTop: 5 }}
            data={contacts}
            nestedScrollEnabled
            renderItem={({item}) => <ContactItem item={item} />}
            keyExtractor={(item, index) => item.recordID.toString()}></FlatList>
        </View>
      </View>
      <ModalForm setModalState={setModalState} modalState={modalState} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#65AD65',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowOffset: {
      width: 0,
      height: 5
    },
    elevation: 10
  },
  titleContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    fontFamily: 'OpenSans-Bold',
    left: 30,
    color: 'white'
  },
  subtitle: {
    fontSize: 20,
    left: 30,
    color: 'white'
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 10,
    gap: 4
  },
  buttonAddContainer: {
    borderRadius: 15,
    backgroundColor: 'rgb(85,0,255)',
    width: '50%',
    alignItems: 'center',
    paddingVertical: 10,
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
  },
  flatlist: {
    flex:3,
    marginBottom: '5%'
  },
  actionButtons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    right: 20
  }
});

export default ContactsList;
