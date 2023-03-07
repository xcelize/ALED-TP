import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Button, Card, Icon } from 'react-native-elements';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction } from 'redux';
import { SETCONTACTS } from '../Store/Actions/Contact';
import { Contact } from '../Types/Contact';

interface TypesProps {
    item: any;
}

const ImportContactItem = ({item}: TypesProps) => {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const dispach = useDispatch();
    const contactReducer = useSelector((state: AnyAction) => state.contacts);
    const importContact = () => {
        const contact: Contact = {
            familyName: item.familyName,
            givenName: item.givenName,
            phoneNumber: item.phoneNumbers[0]?.number,
            recordID: '0',
            priority: 1
        }
        let exist: boolean = contactReducer.contactList.filter((e: Contact) => e.phoneNumber == contact.phoneNumber).length != 0;
        if (!exist) {
            dispach({ type: SETCONTACTS, value: contact });
            Toast.show({
                type: 'success',
                text1: `Le contact ${item.displayName} à été ajouté`
            });
        } else {
            Toast.show({
                type: 'error',
                text1: `Le contact ${item.displayName} existe déjà avec ce même numéro`
            });
        }
    }
    useEffect(() => {
    }, [item])
    return (
        <Card>
        <Card.Title style={{fontSize: 20}}>{item.displayName}</Card.Title>
        <Card.Divider/>
        <Text style={{marginBottom: 10, textAlign: 'center', fontSize:25, fontWeight:'bold'}}>
          {item.phoneNumbers[0]?.number}
        </Text>
        <View style={{flex: 1, flexDirection: 'row', gap: 8, alignContent: 'center', justifyContent: 'center'}}>
          <Button
            onPress={() => importContact()}
            icon={<Icon name='edit' color='#ffffff' />}
            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, gap:8}}
            title='Importer' />
        </View>
      </Card>
        // <View style={styles.container}>
        //     <View style={styles.textContainer}>
        //         <Text style={styles.name}>{item.item.displayName}</Text>
        //         <Text style={styles.number}>{splitedNumbers(item.item.phoneNumbers)}</Text>
        //     </View>
        //     <View style={styles.buttonContainer}>
        //         <Pressable
        //             style={styles.buttonImport}
        //             onPress={() => importContact()}>
        //             <Text style={{ textAlign: 'center', color: 'white' }}>Importer ce contact</Text>
        //         </Pressable>
        //     </View>
        // </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 5,
        paddingHorizontal: 5,
        flexDirection: 'row'
    },
    name: {
        fontSize: 20
    },
    number: {
        fontWeight: '700'
    },
    buttonImport: {
        flex: 1,
        backgroundColor: 'rgb(85,0,255)',
        alignItems: 'center',
        marginRight: 5,
        paddingHorizontal: 5,
        paddingVertical: 3,
    },
    textContainer: {
        flex: 2,
        flexDirection: 'column'
    },
    buttonContainer: {
        flex: 1,
        alignContent: 'flex-end'
    }
})

export default ImportContactItem;