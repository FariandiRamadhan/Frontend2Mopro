import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, Button, StyleSheet, Alert} from 'react-native';
import Form from 'react-native-form';
import CheckBox from 'react-native-check-box';
import Textarea from 'react-native-textarea';
import { Dropdown } from 'react-native-element-dropdown';

const data = [
  { label: 'Ruang 1', value: '1' },
  { label: 'Ruang 2', value: '2' },
  { label: 'Ruang 3', value: '3' }
];


export default class InstallPackage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isChecked: false,
      data: [],
    };
  }
render() {
  const options = ['terjadwal', 'selesai'];

    return (
      <View style={{ marginTop: 50, marginHorizontal: 20 }}>
      

        {/* Form */}
        <Form ref="form">
          <TextInput type="TextInput" name="myTextInput" placeholder='topik rapat' 
            style={{
            backgroundColor: 'white',
            padding: 5,
            borderWidth: 1,
            borderRadius: 10,
            paddingLeft:10,
          }}/> 
        </Form>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
        <Text style={{ marginRight: 10 }}>Topik Rapat:</Text>
        <TextInput
          type="TextInput"
          name="myTextInput"
          placeholder="topik rapat"
          style={{
            backgroundColor: 'white',
            padding: 5,
            borderWidth: 1,
            borderRadius: 10,
            paddingLeft: 10,
            flex: 1, // Membuat input mengambil sisa ruang
          }}
        />
      </View>


      {/* Checbox */}
      <CheckBox
          style={{ padding: 10 }}
          onClick={() => {
            this.setState({
              isChecked1: !this.state.isChecked1,
            });
          }}
          isChecked={this.state.isChecked1}
          leftText={'CheckBox 1'}
        />
        <CheckBox
          style={{ padding: 10 }}
          onClick={() => {
            this.setState({
              isChecked2: !this.state.isChecked2,
            });
          }}
          isChecked={this.state.isChecked2}
          leftText={'CheckBox 2'}
        />
        <CheckBox
          style={{ padding: 10 }}
          onClick={() => {
            this.setState({
              isChecked3: !this.state.isChecked3,
            });
          }}
          isChecked={this.state.isChecked3}
          leftText={'CheckBox 3'}
        />

        <Textarea
          containerStyle={{
          padding: 5,
          backgroundColor: 'white',
          borderWidth: 1,
          borderRadius: 5,
          borderColor: 'black',
          height: 180,
        }}
          style={{
          textAlignVertical: 'top',
          flex: 1,
        }}
          placeholder={'deskripsi meeting'}
          placeholderTextColor={'#c7c7c7'}
        />

        {/* Dropdown */}
    <Dropdown
        style={[
          {
            height: 50,
            borderColor: 'gray',
            borderWidth: 0.5,
            borderRadius: 8,
            paddingHorizontal: 8,
            marginTop:10
          },
          this.state.isFocus && { borderColor: 'blue' },
        ]}
        placeholderStyle={{ fontSize: 16 }}
        selectedTextStyle={{ fontSize: 16 }}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!this.state.isFocus ? 'Pilih Ruangan' : 'Pilih Ruangan'}
        value={this.state.dropdownValue}
        onFocus={() => this.setState({ isFocus: true })}
        onBlur={() => this.setState({ isFocus: false })}
        onChange={(item) => {
          this.setState({ dropdownValue: item.value, isFocus: false });
        }}
      />

        {/* Radio Button */}
        <Text
          style={{
            marginTop:10
          }}
        >Status Agenda:</Text>
          {options.map((option) => {
            return (
              <TouchableOpacity
                key={option}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  columnGap: 10,
                  margin: 5,
                }}
                  onPress={() => this.setState({ selectedAgenda: option })}
              >
            <View
              style={{
              width: 20,
              height: 20,
              borderRadius: 15,
              borderWidth: 1,
              justifyContent: 'center',
              alignItems: 'center',
              }}
            >
              {this.state.selectedAgenda === option ? (
            <View
              style={{
                width: 22,
                height: 22,
                borderRadius: 11,
                backgroundColor: 'black',
              }}
            />
              ) : null}
            </View>
          <Text>{option}</Text>
      </TouchableOpacity>
          );
        })}
      

      </View>
        );
}
}

