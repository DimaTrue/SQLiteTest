import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Platform} from 'react-native';
import SQLite from 'react-native-sqlite-storage';

import {select} from './src/db';
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

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
    };
  }

  componentDidMount() {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM pet ', [], (tx, res) => {
        res.rows.length && this.setState({data: res.rows.raw()});
      });
    });
  }

  componentWillUnmount() {
    db.close();
  }

  handleAdd = () => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO pet(owner, petname) VALUES(?, ?)',
        ['TEST6', 'test6'],
        (tx, res) => {
          console.warn('res', res);
        },
        error => console.warn('error', error.message),
      );
    });
  };

  handleUpdate = () => {
    db.transaction(
      tx => {
        tx.executeSql(
          'UPDATE pet SET owner=? WHERE petname=?',
          ['TEST6', 'test6'],
          (tx, res) => console.warn('res', res),
        );
      },
      error => console.warn(error),
    );
  };

  handleDelete = () => {
    db.transaction(
      tx => {
        tx.executeSql('DELETE FROM pet WHERE owner=?', ['TEST6'], res =>
          console.warn('res ', res),
        );
      },
      error => console.warn(error),
    );
  };

  handleCreate = () => {
    db.transaction(
      tx => {
        tx.executeSql('CREATE TABLE testTable(FirstName, LastName)', [], res =>
          console.warn(res),
        );
      },
      error => console.warn(error),
    );
  };

  handleShow = () => {
    db.transaction(
      tx => {
        tx.executeSql('SELECT * FROM testTable ', [], res => console.warn(res));
      },
      error => console.warn(error),
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>SQLite Example</Text>
        <TouchableOpacity onPress={this.handleAdd}>
          <Text>Add Data</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.handleUpdate}>
          <Text>UPDATE Data</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.handleDelete}>
          <Text>DELETE Data</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.handleCreate}>
          <Text>CREATE Data</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.handleShow}>
          <Text>SHOW Data</Text>
        </TouchableOpacity>
        <Text>
          Owners:
          {this.state.data &&
            this.state.data.map((el, i) => <Text key={i}>{el.owner} , </Text>)}
        </Text>
        <Text>
          Pets:
          {this.state.data &&
            this.state.data.map((el, i) => (
              <Text key={i}>{el.petname} , </Text>
            ))}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
