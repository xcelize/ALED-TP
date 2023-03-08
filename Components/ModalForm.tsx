import {Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {Dispatch, SetStateAction, useEffect} from 'react';
import {Contact} from '../Types/Contact';
import FormComponent from './FormComponent';
import { Icon, Overlay } from 'react-native-elements';

interface TypeProps {
  setModalState: Dispatch<SetStateAction<boolean>>;
  modalState: boolean;
  item?: Contact;
}

const ModalForm = ({setModalState, modalState, item}: TypeProps) => {
  useEffect(() => {}, []);
  const toggleOverlay = () => {
    setModalState(!modalState);
  };

  return (
    <View>
      <Overlay overlayStyle={{width: '75%', flex: 1, maxHeight: '75%'}} isVisible={modalState} onBackdropPress={toggleOverlay}>
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ flex: 1, textAlign: 'center', top: 20, left: 10, alignContent:'center', fontSize: 25, fontWeight: '900' }}>Detail contact</Text>
        <Icon
          raised
          style={{ flex:1, alignItems: 'flex-end', backgroundColor: 'red' }}
          name='close'
          color='#f50'
          onPress={() => toggleOverlay()} />
      </View>
      <FormComponent
            item={item}
            modalState={modalState}
            setModalState={setModalState}
          />
      </Overlay>
    </View>
  );
  // return (
    
  //   // <Modal visible={modalState}>
  //   //   <View style={styles.modal}>
  //   //     <View
  //   //       style={{marginTop: 30, alignItems: 'flex-end', marginRight: '10%'}}>
  //   //       <Pressable onPress={() => onClosed()} style={{}}>
  //   //         <Text>Fermer</Text>
  //   //       </Pressable>
  //   //     </View>
  //   //     <View style={styles.formContainer}>
  //   //       <FormComponent
  //   //         item={item}
  //   //         modalState={modalState}
  //   //         setModalState={setModalState}
  //   //       />
  //   //     </View>
  //   //   </View>
  //   // </Modal>
  // );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    borderRadius: 25,
    shadowColor: '#6b6464',
    shadowRadius: 25,
    elevation: 15,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 10,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
  },
  addButton: {
    backgroundColor: 'rgb(85,0,255)',
    padding: 10,
    borderRadius: 10,
  },
  closeButton: {
    backgroundColor: 'rgb(192,16,30)',
    padding: 10,
    borderRadius: 10,
  },
  buttonsText: {
    fontFamily: 'Roboto',
    fontSize: 20,
    color: 'white',
    paddingHorizontal: 15,
  },
  formContainer: {
    flex: 3,
  },
});
export default ModalForm;
