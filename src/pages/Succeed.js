import Biometrics from 'react-native-biometrics'
import React, {Component} from 'react';
import {Platform, StyleSheet, Text,TextInput, View,Button,StatusBar,ImageBackground,BackHandler,TouchableOpacity,Image,ListView,ScrollView} from 'react-native';
import { Header,Icon } from 'react-native-elements';
import {DrawerNavigator} from 'react-navigation';
import JellySideMenu from 'react-native-jelly-side-menu'
import Toast, { DURATION } from 'react-native-easy-toast';
import {
  createWebDAVAdapter,
} from "@buttercup/mobile-compat";
import ActionButton from 'react-native-action-button';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

  export default class Succeed extends Component {
  static navigationOptions = {
    header:null
    
  };

  async componentDidMount() {
    // PrivacySnapshot.enabled(true);
    StatusBar.setBarStyle( 'dark-content',true)
    StatusBar.setBackgroundColor("grey")
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      // this.setState({ isLoading: true });
      // this.getBackToHomePath("") // works best when the goBack is async
      alert("hey");
      return true;
    });
  }
  componentWillUnmount() {
    // PrivacySnapshot.enabled(true);
    // Remove the event listener
    // this.focusListener.remove();
    this.backHandler.remove();
  }


  constructor(props) {
    super(props);
    const { navigation } = this.props;
    const data = navigation.getParam('data', 'nothing inside');
    const data1 = navigation.getParam('data1', 'nothing inside');
    const data2 = navigation.getParam('data2', 'nothing inside');
    console.log(data,data1,data2);
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
    this.arrayholder = [];
    const zaza = createWebDAVAdapter(
      this.state.side,
      this.state.username,
      this.state.password,
    );
    zaza.readdir("/", (err, contents) => {
      if (!err) {
        console.log(contents);
        this.setState({ contentInside: [contents] }, () => {
          this.helloHopeThisCan();
        });
      }
    });
  }

  helloHopeThisCan = () => {

    this.setState(() => ({
      dataSource: this.state.dataSource.cloneWithRows(this.state.contentInside[0]),
      data: this.state.contentInside[0],
    }));

    //Below is for search engine
    const toto = createWebDAVAdapter(
      this.state.side,
      this.state.username,
      this.state.password,
    );
    toto.readdir("/", (err, contents) => {
      if (!err) {
        this.setState({ hello: contents });
        this.arrayholder = contents;
      }
    });
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
      <View style={{backgroundColor:'white',height:'100%',width:'100%'}}>
        <Image style={styles.imageSize} source={require('../images/Logo.png')} />
        {this.renderItem("  My Drive","cloud-upload", () => {})}
        {this.renderItem("  Recent file","backspace", () => {})}
        {this.renderItem("  Upgrade Storage","data-usage", () => {})}
        {this.renderItem("  Notification","notifications", () => {})}
        {this.renderItem("  Setting","settings", () => {})}
        {this.renderItem("  Logout","remove", () => {this.props.navigation.navigate('Login')})}
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

  defaultView=()=>{
    return(
    <View style={{justifyContent:'center',alignItems: 'center',}}>
      <ListView
      dataSource={this.state.dataSource}
      enableEmptySections="enable"
      visible={this.state.rowView}
      renderSeparator={this.ListViewItemSeparator}
      // scrollEnabled={true}
      contentContainerStyle={styles.list}
      renderRow={(rowData) =>
      
        <TouchableOpacity
          delayLongPress={500}x
          style={styles.button1}
          // style={this.state.Noahyek}

          visible={this.state.cancelFor3Selection}
          onLongPress={() => {
            Alert.alert(
              'Action',
              'please do your choice wisely',
              [
                { text: 'RENAME', onPress: () => { this.showDialog(rowData) } },
                { text: 'DELETE', onPress: () => { this.deleteFunctionTriger(rowData) } },
                { text: 'CANCEL', onPress: () => { this.cancelFor3Selection() } },
              ],
              { cancelable: false }
            )
          }}
          onPress={() => { this.CheckingBeforeGoInFunction(rowData) }}
        >
          <Text>      </Text>
          <Icon name='folder' />
          <Text>  </Text>
          <Text style={styles.buttonText}>{rowData}          </Text>
          <TouchableOpacity
            style={styles.button2}
            onPress={() => { this.setState({ visibleModal: 6, moveRowdata: rowData }) }}
          ><Icon name='more-vert' style={{right:0,flex:1}} /></TouchableOpacity>

        </TouchableOpacity>
            
            
          } />
        {/* {this.defaultView()} */}
    </View>
    ) 
  }
  

 
  render() {
    // YellowBox.ignoreWarnings(['ListView is deprecated']);
    console.disableYellowBox = true;
    return (
      <ImageBackground source={require('../images/Background.png')} style={styles.container} >
        <JellySideMenu 
        ref={(view) => {this.jsm = view}}
        fill={"#FFF"} fillOpacity={1.0}
        style={{width:10000}}
        renderMenu={this.renderMenu}>

        <Header
          placement="left"
          // leftComponent={
          //   <TouchableOpacity
          //   style={{left:20,width:40,height:30,backgroundColor:'red'}}
            
          //   onPress={() => 
          //       this.refs.toast.show(<Text style={styles.exampleTextVer2}>Folder created successfully!!</Text>, DURATION.LENGTH_LONG)
          //       // {this.renderMenu}
          //       // alert("hi")
                
          //     }
          //   >
          //   <Icon
          //     name='right'
          //     size={24}
          //     color='black'
              
          //   />
          //   </TouchableOpacity>
          // }
          centerComponent={{ text: ' Bisston Cloud', style: { color: 'black',fontSize:22,fontWeight: "bold" } }}
          rightComponent={
            <Icon
                name='search'
                size={24}
                color='black'
                onPress={() => this.travelToSearch()}
              />
          }
          style={{flex:0}}
          containerStyle={{height:'7.5%',paddingBottom:23,backgroundColor:'white'}}
        />
        <ScrollView>
        
        
        {this.defaultView()}
        
        </ScrollView> 
        <ActionButton buttonColor="#00008B" offsetY={17} offsetX={15}>
          <ActionButton.Item buttonColor='#9b59b6' title="New Task" onPress={() => console.log("notes tapped!")}>
            <Icon name="md-create" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#3498db' title="Notifications" onPress={() => {}}>
            <Icon name="md-notifications-off" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#1abc9c' title="All Tasks" onPress={() => {}}>
            <Icon name="md-done-all" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
 
        </JellySideMenu>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 16,
    // fontWeight: '500',
    // color: 'white',
    // textAlign: 'center',
  },
  button2: {
    width: 45,
    backgroundColor: 'transparent',
    borderRadius: 4,
    height: 70,
    marginVertical: 3,
    paddingVertical: 17,
    flexDirection: 'row',
    position: 'absolute',
    right: 2
  },
  exampleTextVer2: {
    fontSize: 15,
    marginBottom: 0,
    marginHorizontal: 15,
    textAlign: 'center',
    color: 'black',
  },
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
  button1: {
    width: 420,
    backgroundColor: 'white',
    borderRadius: 4,
    height: 78,
    marginVertical: 1,
    textAlign: 'center',
    paddingVertical: 12,
    alignItems: 'center',
    flexDirection: 'row'
  },
});
