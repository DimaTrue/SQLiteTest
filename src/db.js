import SQLite from 'react-native-sqlite-storage';
import {Platform} from 'react-native';

const config =
  Platform.OS === 'ios'
    ? {
        name: 'TestDB',
        createFromLocation: '~www/TestDB.db',
        location: 'Library',
      }
    : {
        name: 'TestDB.db',
        location: 'default',
        createFromLocation: '~www/TestDB.db',
      };

const db = SQLite.openDatabase(
  config,
  res => console.warn('resOpen ', res),
  error => console.warn('errorOpen', error),
);

export const getTableData = currentTable => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM pet',
        [],
        (tx, res) => {
          resolve(res.rows.length && res.rows.raw());
        },
        error => resolve(console.warn('error', error)),
      );
    });
  });
};

export const addTableData = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO pet(owner, petname) VALUES(?, ?)',
        ['TEST1', 'test1'],
        (tx, res) => {
          resolve(getTableData());
        },
        error => resolve(console.warn('error', error)),
      );
    });
  });
};

export const updateTableData = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE pet SET petname=? WHERE owner=?',
        ['parrot', 'TEST1'],
        (tx, res) => {
          resolve(getTableData());
        },
        error => resolve(console.warn('error', error)),
      );
    });
  });
};

export const deleteTableData = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM pet WHERE owner=?',
        ['TEST1'],
        (tx, res) => {
          resolve(getTableData());
        },
        error => resolve(console.warn('error', error)),
      );
    });
  });
};

export const createTableData = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE testTable3(petname, owner)',
        [],
        (tx, res) => {
          resolve(console.warn(res));
        },
        error => resolve(console.warn('error', error)),
      );
    });
  });
};

export const getColumns = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'PRAGMA table_info(pet)',
        [],
        (tx, res) => {
          resolve(res.rows.raw().map(el => el.name));
        },
        error => resolve(console.warn('error', error)),
      );
    });
  });
};

export const getTables = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT name FROM sqlite_master WHERE type=?',
        ['table'],
        (tx, res) => {
          resolve(res.rows.raw().map(el => el.name));
        },
        error => resolve(console.warn('error', error)),
      );
    });
  });
};
