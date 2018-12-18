import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
import Transaction from './transaction.js'
import Block from './block.js'
import Blockchain from './blockchain.js'

export default class App extends Component {

  constructor(){
    super()
    this.genesisBlock = new Block();
    this.blockchain = new Blockchain(this.genesisBlock);
  }

  state = {
      from: '',
      to: '',
      distance: ''
   }
   handleFrom = (text) => {
      this.setState({ from: text })
   }
   handleTo = (text) => {
      this.setState({ to: text })
   }
   handleDistance = (text) => {
      this.setState({ distance: text })
   }
   add = (from, to, distance) => {
      this.transaction = new Transaction(from,to,distance)
      this.block = this.blockchain.getNextBlock([this.transaction])
      this.blockchain.addBlock(this.block)

      alert(JSON.stringify(this.blockchain))
   }
  render() {
    return (
      <View style = {styles.container}>
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "From"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText = {this.handleFrom}/>
            
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "To"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText = {this.handleTo}/>

            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Distance (KM)"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText = {this.handleDistance}/>
            
            <TouchableOpacity
               style = {styles.submitButton}
               onPress = {
                  () => this.add(this.state.from, this.state.to, this.state.distance)
               }>
               <Text style = {styles.submitButtonText}> Submit </Text>
            </TouchableOpacity>
         </View>
    );
  }
}

const styles = StyleSheet.create({
   container: {
      paddingTop: 50
   },
   input: {
      margin: 15,
      height: 40,
      borderColor: '#7a42f4',
      borderWidth: 1
   },
   submitButton: {
      backgroundColor: '#7a42f4',
      padding: 10,
      margin: 15,
      height: 40,
   },
   submitButtonText:{
      color: 'white'
   }
})