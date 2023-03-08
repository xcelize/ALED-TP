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
import { Button, Input } from 'react-native-elements';

interface TypesProps {
  item?: Contact;
  setModalState: Dispatch<SetStateAction<boolean>>;
  modalState: boolean;
}

const FormComponent = ({item, setModalState, modalState}: TypesProps) => {

  const [givenName, setGivenName] = useState(item?.givenName);
  const [phoneNumber, setPhoneNumber] = useState(item?.phoneNumber);
  const [familyName, setFamilyName] = useState(item?.familyName);
  const [checkValidGivenName, setValidGivenName] = useState(false);
  const [checkValidPhoneNumber, setCheckValidPhoneNumber] = useState(false);

  const dispach = useDispatch();

  const handleValidGivenName = (text?: string): void => {
    setGivenName(text);
    if (text != '') {
      setValidGivenName(true);
    } else {
      setValidGivenName(false);
    }
  }

  const handleValidPhoneNumber = (text: string): void => {
    setPhoneNumber(text);
    if (text != '') {
      (text.startsWith("+") && text.length <= 11) || (text.startsWith("0") && text.length <= 10) ? setCheckValidPhoneNumber(true) : setCheckValidPhoneNumber(false);
    } else {
      setCheckValidPhoneNumber(false);
    }
  }

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
    <SafeAreaView style={{ height: '75%' }}>
      <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center', flexDirection: 'column' }}>
          <View style={{ width: 250 }}>
            <Input placeholder='Nom du contact' value={givenName} onChangeText={(text) => handleValidGivenName(text)} />
            {
              !checkValidGivenName ? (
                <Text style={{ color: 'red', fontSize: 14, alignSelf: 'center', bottom: 20 }}>Le nom ne peut pas être vide</Text>
              ) : null
            }
          </View>
          <View style={{ width: 250 }}>
            <Input placeholder='Prenom du contact' value={familyName} onChangeText={(text) => handleValidPhoneNumber(text)} />
          </View>
          <View style={{ width: 250 }}>
            <Input style={{ flex: 1 }} placeholder='Numéro du contact' value={phoneNumber} onChangeText={(text) => handleValidPhoneNumber(text)} keyboardType='number-pad' />
            {
              !checkValidPhoneNumber ? (
                <Text style={{ color: 'red', fontSize: 14, alignSelf: 'center', bottom: 20 }}>Le numéro de téléphone est invalide</Text>
              ) : null
            }
          </View> 
          <Button onPress={() => onSave()} disabled={!checkValidGivenName || !checkValidPhoneNumber} title='Enregistrer' />
      </View>
    </SafeAreaView>
  );
};

export default FormComponent;
