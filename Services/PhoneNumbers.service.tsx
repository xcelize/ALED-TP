import PhoneContacts from '../Assets/number';
import {Contact} from '../Types/Contact';

function getContactsList(): Contact[] {
  return PhoneContacts as Contact[];
}

export default getContactsList();
