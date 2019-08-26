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
        `SELECT * FROM ${currentTable}`,
        [],
        (tx, res) => {
          resolve(res.rows.length && res.rows.raw());
        },
        error => resolve(console.warn('error', error)),
      );
    });
  });
};

export const addTableData = currentTable => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO ${currentTable}(owner, petname) VALUES(?, ?)`,
        ['TEST2', 'test2'],
        (tx, res) => {
          resolve(getTableData(currentTable));
        },
        error => resolve(console.warn('error', error)),
      );
    });
  });
};

export const updateTableData = currentTable => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `UPDATE ${currentTable} SET owner=? WHERE petname=?`,
        ['Jack', 'parrot'],
        (tx, res) => {
          resolve(getTableData(currentTable));
        },
        error => resolve(console.warn('error', error)),
      );
    });
  });
};

export const deleteTableData = currentTable => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `DELETE FROM ${currentTable} WHERE owner=?`,
        ['TEST11'],
        (tx, res) => {
          resolve(getTableData(currentTable));
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
        'CREATE TABLE testTable1(Firstname, Lastname)',
        [],
        (tx, res) => {
          resolve(console.warn(res));
        },
        error => resolve(console.warn('error', error)),
      );
    });
  });
};

export const getColumns = currentTable => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `PRAGMA table_info(${currentTable})`,
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
