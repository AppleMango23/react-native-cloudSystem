import Biometrics from 'react-native-biometrics'
import React, {Component} from 'react';
import {Platform, StyleSheet, Text,TextInput, View,Button,StatusBar,ImageBackground,BackHandler,TouchableOpacity,Image,ListView,ActivityIndicator,ScrollView} from 'react-native';
import { Header,Icon,Overlay } from 'react-native-elements';
import {DrawerNavigator} from 'react-navigation';
import JellySideMenu from 'react-native-jelly-side-menu'
import Toast, { DURATION } from 'react-native-easy-toast';
import {
  createWebDAVAdapter,
} from "@buttercup/mobile-compat";
import ActionButton from 'react-native-action-button';
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';


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
    StatusBar.setBarStyle( 'light-content',true)
    StatusBar.setBackgroundColor("#A9A9A9")
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      // this.setState({ isLoading: true });
      // this.getBackToHomePath("") // works best when the goBack is async
      console.log("-------------------------Pressed back-------------------------");
      return true;
    });
    this.interval = setInterval(
      () => this.setState((prevState)=> ({ timer: prevState.timer - 1 })),
      1000
    );
  }
  componentDidUpdate(){
    if(this.state.timer === 1){ 
      clearInterval(this.interval);
    }
  }
  componentWillUnmount() {
    // PrivacySnapshot.enabled(true);
    // Remove the event listener
    // this.focusListener.remove();
    clearInterval(this.interval);
    // this.backHandler.remove();
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
      dataSource2: ds.cloneWithRows([]),
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
      testingArray:[],
      forFileArray:[],
      rowView:false,
      isVisible:true,
      timer: 6,
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
s
  helloHopeThisCan = () => {

    // this.setState(() => ({
    //   dataSource: this.state.dataSource.cloneWithRows(this.state.contentInside[0]),
    //   data: this.state.contentInside[0],
    // }));

    //Below is for search engine
    const toto = createWebDAVAdapter(
      this.state.side,
      this.state.username,
      this.state.password,
    );
    toto.readdir("/", async(err, contents) => {
      if (!err) {
        this.setState({ hello: contents });
        this.arrayholder = contents;
        await this.loopToCheckFolder(); 
      }
    });
  }
  loopToCheckFolder=async()=>{
    for(var x=0; x<this.arrayholder.length; x++){
      pono=this.arrayholder[x];
      await this.pushFolderIntoArray(pono);

      
      
    }
  }
  pushFolderIntoArray = (rowData) => {
    console.log(rowData);
    
    // modifying move file 
    var statement = false;
    var testThing = false;
    const wfs = createWebDAVAdapter(
      this.state.side,
      this.state.username,
      this.state.password,
    );

    var string1 = "/";
    var string2 = string1.concat(rowData)


    wfs.stat(string2, (err, data) => {
      // console.log("Is file:", data.isFile());
      testThing = data.isFile();
      if (statement !== testThing) {
        this.state.forFileArray.push(rowData);
        this.testing();
      }
      else {
        console.log(rowData);
        this.state.testingArray.push(rowData);
        this.testing();
      }
		});
  }
  testing=()=>{
    this.setState(() => ({
      dataSource: this.state.dataSource.cloneWithRows(this.state.testingArray),
      dataSource2:this.state.dataSource.cloneWithRows(this.state.forFileArray),
      isLoading: false,
    }));

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

  visibleFunction=()=>{
    return ('false');
  }

  

  defaultView=()=>{
    return(
    <View visible={this.state.rowView}>

      <Text></Text>
      <Text style={{left:5,fontSize:23}}>Folder</Text>
      <View style={{justifyContent:'center',alignItems: 'center',}}>
        <ListView
        dataSource={this.state.dataSource}
        enableEmptySections="enable"
        //change this
        // visible={this.visibleFunction()}
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
      </View> 
        <Text></Text>
        <Text style={{left:5,fontSize:23}}>File </Text>

        <View style={{justifyContent:'center',alignItems: 'center',}}>
        <ListView
        dataSource={this.state.dataSource2}
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
            <Icon name='folder-open' />
            <Text>  </Text>
            <Text style={styles.buttonText}>{rowData}          </Text>
            <TouchableOpacity
              style={styles.button2}
              onPress={() => { this.setState({ visibleModal: 6, moveRowdata: rowData }) }}
            ><Icon name='more-vert' style={{right:0,flex:1}} /></TouchableOpacity>

          </TouchableOpacity>
        
              
            } />
          
      </View> 
    
    </View>
    ) 
  }

tata=()=>{
  if(this.state.timer===2){
    this.setState({isVisible:false,timer:0})
    console.log("tata is here----------------------",this.state.isVisible)
    // console.log(this.state.isVisible);

    
    return(null)
  }
}

openPickDoc=()=>{
  DocumentPicker.show({
    filetype: [DocumentPickerUtil.images()],
  },(error,res) => {
    // Android
    console.log("===================RESNAME=====>",res)
    this.setState({ uploadFileName: res.fileName}, () => {
      this.combineTwoStrings(res);
    });
  });
}

combineTwoStrings = (res) => {
  // var string1 = "/Documents/";
  var string1 = "/";
  var string2 = string1.concat(this.state.uploadFileName)
  this.setState({ uploadFileName: string2 }, () => {
    this._handleImagePicked(res);
  });
}

_handleImagePicked = async pickerResult => {
  console.log("handleImage");
  console.log(pickerResult);
  try {
    this.setState({ uploading: true });

    if (!pickerResult.cancelled) {
      uploadUrl = await this.uploadFileAsync(pickerResult.uri);
      // this.setState({ image: uploadUrl });
    }
  } catch (e) {
    console.log(e);
  } finally {
    this.setState({ uploading: false });
  }
};

uploadFileAsync = async (uri) => {
  console.log("upload station");
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
  });

  const wfs = createWebDAVAdapter(

    this.state.side,
    this.state.username,
    this.state.password,
  );

  wfs.writeFile(this.state.uploadFileName, blob, "binary", (err) => {
    if (err) {
      console.error(err.message);
    }
    else {
      console.log("added file =>> ",this.state.uploadFileName);
      alert("added ",this.state.uploadFileName);

      //HERE NEED TO ADD A METHOD TO PUSH THE VAR TO THE ARRAY

      // this.refs.toast.show(<Text style={styles.exampleTextVer2}>File uploaded successfully!!</Text>, DURATION.LENGTH_LONG)

      // const zaza = createWebDAVAdapter(
      //   this.state.side,
      //   this.state.username,
      //   this.state.password,
      // );
      // zaza.readdir("/", (err, contents) => {
      //   if (!err) {
      //     this.setState({ contentInside: [contents] }, () => {    //test contents.type later
      //       this.helloHopeThisCan();
      //     });
      //   }
      // });
      // alert("Uploaded");
    }
  });
  blob.close();
}


  

 
  render() {
    {this.tata()}
    console.disableYellowBox = true;
    return (
      <ImageBackground source={require('../images/Background.png')} style={styles.container} >
        <Overlay
          isVisible={this.state.isVisible}
          windowBackgroundColor="rgba(52, 52, 52, 0.7)"
          overlayBackgroundColor="transparent"
          width="100%"
          height="100%"
          containerStyle={{borderColor:'transparent'}}
          onBackdropPress={() => this.setState({ isVisible: false })}
        >
          <View style={{ alignItems:'center',left:'20%',paddingVertical:'85%',flexDirection:'row',justifyContent: 'space-around'}}>
            <Text style={{color:'white',fontSize:24,fontWeight:"bold",}}>Loading.... </Text>
            <View style={{ alignItems:'center',right:120,paddingVertical:12}}>
            <ActivityIndicator size="large" color="white" />
            </View>
          </View>
          
        </Overlay>

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
          <ActionButton.Item buttonColor='#9b59b6' title="Upload File" onPress={() => this.openPickDoc()}>
            <Icon name="update" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#3498db' title="New Folder" onPress={() => {}}>
            <Icon name="tune" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          {/* <ActionButton.Item buttonColor='#1abc9c' title="All Tasks" onPress={() => {}}>
            <Icon name="undo" style={styles.actionButtonIcon} />
          </ActionButton.Item> */}
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