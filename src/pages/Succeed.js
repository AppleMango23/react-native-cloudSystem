import Biometrics from 'react-native-biometrics'
import React, {Component} from 'react';
import {Platform, StyleSheet, Text,TextInput, View,Button,ImageBackground,TouchableOpacity,Image,ListView,ScrollView} from 'react-native';
import { Header,Icon } from 'react-native-elements';
import {DrawerNavigator} from 'react-navigation';
import JellySideMenu from 'react-native-jelly-side-menu'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class JellySideMenuPage extends Component {
  static navigationOptions = {
    header:null
    
  };
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    const data = navigation.getParam('data', 'nothing inside');
    const data1 = navigation.getParam('data1', 'nothing inside');
    const data2 = navigation.getParam('data2', 'nothing inside');
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.itemStyle = {padding: 16, backgroundColor: 'transparent',flexDirection:'row'};
    this.itemTextStyle = {color: '#000000', fontSize: 17};
    this.renderMenu = this.renderMenu.bind(this);
    this.state = {
      changingStatus: 'zzz',
      arrMou: [],
      username: data,
      password: data1,
      side: data2,
      dataSource: ds.cloneWithRows([]),
      dialogVisible: false,
      wordForRename: "",
      cameraRollUri: null,
      DeleteDialogVisible: false,
      wordForDelete: "",
      searchWord: '',
      firstLayerfile: true,
      cancelFor3Selection: false,
      SecondLayerfile: false,
      isLoading: true, text: '', //state for searching
      wordForPopOutNotification: '',//state for popOut Notification
      layer2Path: "",
      dialogCreateFolderVisible: false,
      wordForFolder: "",
      text: '',
      checked:false,
      Noahyek:styles.button1,
    }
  }
 
  renderItem(text, iconName,onPress) {
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={this.itemStyle}>
          <Icon name={iconName} size={24} color='black'/>
          <Text style={this.itemTextStyle}>{text}</Text>
        </View>
      </TouchableOpacity>
    )
  }
 
  renderMenu() {
    return (
      <View>
        <Image style={styles.imageSize} source={require('../images/Logo.png')} />
        {this.renderItem("  My Drive","cloud-upload", () => {})}
        {this.renderItem("  Recent file","backspace", () => {})}
        {this.renderItem("  Upgrade Storage","data-usage", () => {})}
        {this.renderItem("  Notification","notifications", () => {})}
        {this.renderItem("  Setting","settings", () => {})}
        {this.renderItem("  Logout","remove", () => {})}
        {this.renderItem("  Close Drawer","close", () => {this.jsm.toggleSideMenu(false);})}
      </View>
    )
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
  travelToSearch=()=>{
    this.props.navigation.navigate('ShowSearch')
    // this.props.navigation.openDrawer();
  }
  

 
  render() {
    return (
      <ImageBackground source={require('../images/Background.png')} style={styles.container} >
        <JellySideMenu 
        ref={(view) => {this.jsm = view}}
        fill={"#FFF"} fillOpacity={1.0}
        renderMenu={this.renderMenu}>

        <Header
          placement="left"
          leftComponent={
            <Icon
              name='menu'
              size={24}
              color='black'
              // onPress={() => this.travelToSearch()}
            />
          }
          centerComponent={{ text: '  Bisston Cloud', style: { color: 'black',fontSize:20 } }}
          rightComponent={
            <Icon
                name='search'
                size={24}
                color='black'
                onPress={() => this.travelToSearch()}
              />
          }
          style={{flex:1}}
          containerStyle={{height:'7.5%',paddingBottom:23,backgroundColor:'white'}}
        />
        <ScrollView>
        {this.changingStatus()}
        <Text style={styles.welcome}>Next Screen</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        {/* {this.defaultView()} */}

        </ScrollView> 
 
        </JellySideMenu>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  imageSize: {
    aspectRatio: 0.6,
    resizeMode: 'contain',
  },
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
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
