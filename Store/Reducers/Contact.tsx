import {SETCONTACTS, UPDATE_CONTACT} from '../Actions/Contact';
import {Contact} from '../../Types/Contact';
import numbers from '../../Assets/number';

const initialState = {
  contactList: numbers as Contact[],
  id: numbers.length + 1,
};

function contacts(state = initialState, action: any) {
  let nextState;
  switch (action.type) {
    case SETCONTACTS: {
      const newContact: Contact = action.value;
      newContact.recordID = state.id.toString();
      let listeTemp: Contact[] = [...state.contactList, newContact].sort((a: Contact, b: Contact) => a.givenName.localeCompare(b.givenName));
      listeTemp = listeTemp.sort((a,b) => a.priority - b.priority);
      nextState = {
        ...state,
        contactList: listeTemp,
        id: state.id + 1,
      };
      return nextState || state;
    }
    case UPDATE_CONTACT: {
      const filteredContacts: Contact[] = state.contactList.filter(
        e => e.recordID !== action.value.recordID,
      );
      let listeTemp: Contact[] = [...filteredContacts, action.value].sort((a: Contact, b: Contact) => a.givenName.localeCompare(b.givenName));
      listeTemp = listeTemp.sort((a,b) => b.priority - a.priority);
      nextState = {
        ...state,
        contactList: listeTemp,
      };
      return nextState || state;
    }
    default:
      return state;
  }
}

export default contacts;
