import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, Button, StyleSheet, Alert} from 'react-native';
import Form from 'react-native-form';
import CheckBox from 'react-native-check-box';
import Textarea from 'react-native-textarea';




export default class InstallPackage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isChecked: false,
    };
  }
render() {
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




      </View>
        );
}
}

