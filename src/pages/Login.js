import Biometrics from 'react-native-biometrics'
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, ImageBackground, Image, TextInput, KeyboardAvoidingView } from 'react-native';
import { RNSlidingButton, SlideDirection } from 'rn-sliding-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import {
  createWebDAVAdapter,
} from "@buttercup/mobile-compat";

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {

  static navigationOptions = {
    title: 'Login Screen', header: null
  };

  componentDidMount(){
		this.travellor();
	}

  constructor(props) {
    super(props)
    this.state = {
      username: 'ninjayek@gmail.com',
      password: '123Noahyek$',
      side: '',
      iconMou:'lock',
    }
  }




  combineTwoStrings = () => {
    var string1 = "https://nextcloud-fi.webo.hosting/remote.php/dav/files/";
    var string2 = string1.concat(this.state.username, "/")

    this.setState({ side: string2 }, () => {
      this.login();
    });
  }

  login = () => {
    const wfs = createWebDAVAdapter(
      this.state.side,
      this.state.username,
      this.state.password,
    );

    wfs.readdir("/", (err, contents) => {
      if (!err) {
        console.log("inside the application");
        console.log("Dir contents:", contents);

        Biometrics.simplePrompt('Confirm fingerprint')
          .then(() => {
            console.log('successful fingerprint provided')

            this.travellor();
          })
          .catch(() => {
            console.log('fingerprint failed or prompt was cancelled')
            alert("Fingerprint can't access into system");
          })

      } else {
        Alert.alert("Please key in the correct \nusername and password")
      }
    });
  }

  travellor=()=>{
    //this one have to change to aiman one if he created, remember to bring the data to Succeed.js too.
    this.props.navigation.navigate('Succeed', { data: this.state.username, data1: this.state.password, data2: this.state.side })
  }

  render() {
    return (
      <ImageBackground source={require('../images/Background.png')} style={styles.container} >
        <Image style={styles.imageSize} source={require('../images/Logo.png')} />
        <KeyboardAvoidingView behavior="padding" enabled>
          <View style={{ flexDirection: 'row' }}>
            <Icon
              name='user'
              size={24}
              color='black'
            />
            <TextInput
              value={this.state.username}
              onChangeText={username => this.setState({ username })}
              style={styles.textInputStyle}
              placeholder="Email"
              underlineColorAndroid="#000080"

            />
          </View>


          <View
            style={{
              height: 0.5,
              width: '90%',
              backgroundColor: '#080808',
            }}
          />
        </KeyboardAvoidingView>

        <KeyboardAvoidingView behavior="padding" enabled>
          <View style={{ flexDirection: 'row' }}>
            <Icon
              name='lock'
              size={24}
              color='black'
            />
            <TextInput
              value={this.state.password}
              onChangeText={password => this.setState({ password })}
              style={styles.textInputStyle}
              placeholder="Password"
              underlineColorAndroid="#000080"
              secureTextEntry={true}
            />
          </View>
          <View style={{ alignContent: 'center', justifyContent: 'center' }}>

            <RNSlidingButton
              style={{
                width: 240,
                justifyContent: 'center',
                backgroundColor: '#000080',
                borderRadius: 20,
                alignContent: 'center'
              }}

              height={44}
              onSlidingSuccess={this.combineTwoStrings}
              onSlide={() => 
                this.setState({iconMou:'unlock-alt'})
              }
              slideDirection={SlideDirection.RIGHT}>
              <View style={{ left:7}}>
              <Icon
              name={this.state.iconMou}
              size={36}
              color='white'
              />
              
              </View>
            </RNSlidingButton>
          </View>

        </KeyboardAvoidingView>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text>{"\n"}</Text>

      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  titleText: {
    fontSize: 20,
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  },
  imageSize: {
    aspectRatio: 0.9,
    resizeMode: 'contain',
  },
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
  textInputStyle: {
    height: 36,
    width: 250,
    borderColor: 'transparent',
    borderWidth: 1,
    marginBottom: 20,
    borderRadius: 4,
    backgroundColor: 'transparent',
    textAlign: "center",
  }
});
