import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Picker} from 'react-native';

import {
  getTableData,
  addTableData,
  updateTableData,
  deleteTableData,
  createTableData,
  getColumns,
  getTables,
} from './src/db';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      columns: [],
      tables: [],
      currentTable: '',
    };
    getTables().then(res => this.setState({tables: res, currentTable: res[0]}));
  }

  componentDidMount() {
    getTableData(this.state.currentTable).then((res = []) =>
      this.setState({data: res}),
    );
    getColumns(this.state.currentTable).then((res = []) =>
      this.setState({columns: res}),
    );
  }

  addData = () => addTableData().then(res => this.setState({data: res}));

  updateData = () => updateTableData().then(res => this.setState({data: res}));

  deleteData = () => deleteTableData().then(res => this.setState({data: res}));

  createData = () => createTableData();

  render() {
    const {data, columns, tables, currentTable} = this.state;
    console.warn('tables', data);
    if (columns.length) {
      return (
        <View style={styles.container}>
          <Text>Current Table</Text>
          <Picker
            selectedValue={currentTable}
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({currentTable: `SELECT * FROM ${itemValue}`})
            }>
            {tables &&
              tables.map((el, i) => (
                // eslint-disable-next-line prettier/prettier
                <Picker.Item
                  key={el}
                  label={el}
                  value={el}
                />
              ))}
          </Picker>
          <Text>SQLite Example</Text>
          <TouchableOpacity onPress={this.addData}>
            <Text>Add Data</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.updateData}>
            <Text>UPDATE Data</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.deleteData}>
            <Text>DELETE Data</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.createData}>
            <Text>CREATE Data</Text>
          </TouchableOpacity>

          <View>
            {columns.map((column, i) => {
              return (
                <Text key={`${i} + ${column} + ${Math.random}`}>
                  {column}:
                  {data.length &&
                    data.map((el, i) => (
                      <Text key={`${i} + ${el} + ${Math.random}`}>
                        {el[column] + ' '}
                      </Text>
                    ))}
                </Text>
              );
            })}
          </View>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <Text>SQLite Example</Text>
        <TouchableOpacity onPress={this.addData}>
          <Text>Add Data</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.updateData}>
          <Text>UPDATE Data</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.deleteData}>
          <Text>DELETE Data</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.createData}>
          <Text>CREATE Data</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.showData}>
          <Text>SHOW Data</Text>
        </TouchableOpacity>
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
  picker: {
    height: 50,
    width: 200,
  },
});
