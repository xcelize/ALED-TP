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
      nextState = {
        ...state,
        contactList: [...state.contactList, newContact],
        id: state.id + 1,
      };
      return nextState || state;
    }
    case UPDATE_CONTACT: {
      const filteredContacts: Contact[] = state.contactList.filter(
        e => e.recordID !== action.value.recordID,
      );
      nextState = {
        ...state,
        contactList: [...filteredContacts, action.value],
      };
      return nextState || state;
    }
    default:
      return state;
  }
}

export default contacts;
