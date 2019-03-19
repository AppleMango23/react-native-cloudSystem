import Biometrics from 'react-native-biometrics'
import React, {Component} from 'react';
import {Platform, StyleSheet, Text,TextInput, View,Button,ImageBackground} from 'react-native';
import { Header,Icon } from 'react-native-elements';


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component{
  static navigationOptions = {
    headerTitle: <Text style={{color:'white',fontSize:20}}>   Bisston</Text>,
    headerRight:(
      <View style={{flexDirection:'row'}}>
      <Icon
        name='search'
        size={24}
        color='white'
        onPress={() => alert("hi")}
        
      />
      <Text>    </Text>
      </View>
      ),
    headerLeft:null,  
    headerStyle: {
      backgroundColor: '#1E90FF'
    },
    
  };
  
  constructor(props) {
    super(props)
    this.state = {
      changingStatus: 'zzz',
    }
  }


  pressMe=()=>{
    Biometrics.simplePrompt('Confirm fingerprint')
  .then(() => {
    console.log('successful fingerprint provided')
    this.props.navigation.navigate('Succeed', { data: this.state.username, data1:this.state.password,data2:this.state.side})
  })
  .catch(() => {
    console.log('fingerprint failed or prompt was cancelled')
  })
  }

  changingStatus=()=>{
    if(this.state.changingStatus === "zzz"){
      return(
        <Text>Hey There</Text>
      )
    }
    else{
      return(
        <TextInput
              // value={this.state.username}
              // onChangeText={username => this.setState({ username })}
              // style={styles.textInputStyle}
              placeholder="Email"
              underlineColorAndroid="#000080"

        />
      )
    }
    
  }


  render() {
    return (
      
      <ImageBackground source={require('../images/zaza.jpg')} style={styles.container} >
      
      {/* <View style={styles.container}> */}
        {this.changingStatus()}
        <Text style={styles.welcome}>Next Screen</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        <Button
          onPress={() => this.setState({changingStatus:"pihu"})}
          title="Press me"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      {/* </View> */}
      </ImageBackground>
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
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
