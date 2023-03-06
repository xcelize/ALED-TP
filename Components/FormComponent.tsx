import {Contact} from '../Types/Contact';
import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {SETCONTACTS, UPDATE_CONTACT} from '../Store/Actions/Contact';
import { Input } from 'react-native-elements';

interface TypesProps {
  item?: Contact;
  setModalState: Dispatch<SetStateAction<boolean>>;
  modalState: boolean;
}

const FormComponent = ({item, setModalState, modalState}: TypesProps) => {
  const [givenName, setGivenName] = useState(item?.givenName);
  const [phoneNumber, setPhoneNumber] = useState(item?.phoneNumber);
  const [familyName, setFamilyName] = useState(item?.familyName);
  const dispach = useDispatch();
  const onSave = () => {
    if (item == null) {
      const contact: Contact = {
        recordID: '0',
        givenName: givenName,
        familyName: familyName,
        phoneNumber: phoneNumber,
        priority: 1
      };
      dispach({type: SETCONTACTS, value: contact});
    } else {
      const editedContact: Contact = {
        recordID: item.recordID,
        givenName: givenName,
        familyName: familyName,
        phoneNumber: phoneNumber,
        priority: item.priority
      };
      dispach({type: UPDATE_CONTACT, value: editedContact});
    }
    setModalState(false);
  };
  useEffect(() => {
    if (item == null) {
      setGivenName('');
      setPhoneNumber('');
    }
  }, [item]);
  return (
    <SafeAreaView style={{marginTop: 30}}>
      <Text style={styles.title}>Detail contact</Text>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Input placeholder='Nom du contact' value={givenName} onChangeText={setGivenName} />
          <Input placeholder='Prenom du contact' value={familyName} onChangeText={setFamilyName} />
          <Input placeholder='Numéro du contact' value={phoneNumber} onChangeText={setPhoneNumber} />
        </View>
        <Pressable style={styles.addButton} onPress={() => onSave()}>
          <Text style={styles.buttonsText}>Enregistrer</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  inputContainer: {
    width: '75%',
  },
  formContainer: {
    marginTop: 15,
    height: '80%',
    alignItems: 'center',
    flexDirection: 'column',
    gap: 12,
    position: 'relative',
  },
  addButton: {
    backgroundColor: 'rgb(85,0,255)',
    padding: 10,
    borderRadius: 10,
    position: 'absolute',
    bottom: 0,
  },
  title: {
    fontSize: 25,
    textAlign: 'center',
    marginTop: 50,
  },
  buttonsText: {
    fontFamily: 'Roboto',
    fontSize: 20,
    color: 'white',
    paddingHorizontal: 15,
  },
});
export default FormComponent;
