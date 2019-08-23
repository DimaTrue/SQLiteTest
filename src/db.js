// import SQLite from 'react-native-sqlite-storage';
// import {Platform} from 'react-native';

// const config =
//   Platform.OS === 'ios'
//     ? {
//         name: 'TestDB',
//         createFromLocation: '~www/TestDB.db',
//         location: 'Library',
//       }
//     : {
//         name: 'TestDB.db',
//         location: 'default',
//         createFromLocation: '~www/TestDB.db',
//       };

// const db = SQLite.openDatabase(
//   config,
//   res => console.warn('resOpen ', res),
//   error => console.warn('errorOpen', error),
// );

export const select = db => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM pet ',
      [],
      (tx, res) => {
        res.rows.length && this.setState({data: res.rows.raw()});
      },
      error => console.warn('error', error),
    );
  });
};
