import Contacts from 'react-native-contacts';

export const PERMISSION_AUTHORIZED = Contacts.PERMISSION_AUTHORIZED;
export const PERMISSION_DENIED = Contacts.PERMISSION_DENIED;
export const PERMISSION_UNDEFINED = Contacts.PERMISSION_UNDEFINED;

export const getContacts = () => (
  new Promise((resolve, reject) => {
    Contacts.getAll((err, contacts) => {
      if (err) {
        return reject(err);
      }
      return resolve(contacts);
    });
  })
);

export const checkGetContactsPermission = () => (
  new Promise((resolve, reject) => {
    Contacts.checkPermission((err, permission) => {
      if (err) {
        return reject(err);
      }
      return resolve(permission);
    });
  })
);

export const requestGetContactsPermission = () => (
  new Promise((resolve, reject) => {
    Contacts.requestPermission((err, permission) => {
      if (err) {
        return reject(err);
      }
      return resolve(permission);
    });
  })
);
