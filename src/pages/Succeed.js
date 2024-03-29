import Biometrics from 'react-native-biometrics'
import React, {Component} from 'react';
import {Platform, StyleSheet, Text,TextInput, View,Button,StatusBar,ImageBackground,BackHandler,Animated,TouchableOpacity,Image,ListView,ActivityIndicator,ScrollView} from 'react-native';
import { Header,Icon,Overlay } from 'react-native-elements';
import {DrawerNavigator} from 'react-navigation';
import JellySideMenu from 'react-native-jelly-side-menu'
import Toast, { DURATION } from 'react-native-easy-toast';
import {
  createWebDAVAdapter,
} from "@buttercup/mobile-compat";
import ActionButton from 'react-native-action-button';
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
import Swipeout from 'react-native-swipeout';
import Dialog from "react-native-dialog";


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

  var swipeoutBtns = [
    {
      color:'green',
      text: 'rename',
      backgroundColor:'white',
      
    },
    {
      color:'red',
      text: 'delete',
      backgroundColor:'white',
      
    },
    {
      color:'black',
      text: 'move',
      backgroundColor:'white',
      
    },
    
    
  ]

  var counter=0;

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
      closeOrOpenSlide:false,
      bounceValue: new Animated.Value(100),  //This is the initial position of the subview
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

  travelToSearch=()=>{
    this.props.navigation.navigate('ShowSearch')
  }

  testingHaveToWork=(rowData)=>{

  }

  HaveTowWork=(rowData,WhoToDelete)=>{
    
    var swipeoutBtns22 = [
      {
        color:'green',
        text: 'rename',
        backgroundColor:'white',
        onPress:()=>{ this.testingHaveToWork(rowData)}
        
      },
      {
        color:'red',
        text: 'delete',
        backgroundColor:'white',
        onPress:()=>{ this.deleteFile(rowData,WhoToDelete)}
      },
      {
        color:'black',
        text: 'move',
        backgroundColor:'white',
        onPress:()=>{ this.testingHaveToWork(rowData)}
      },
      
      
    ]


    return (swipeoutBtns22)
  }

  deleteFile=(rowData,WhoToDelete)=>{
    const wfs = createWebDAVAdapter(
      this.state.side,
      this.state.username,
      this.state.password,
    );


    wfs.unlink(rowData, (err) => {
      // handle error if truthy
      if (!err) {
        

        if(WhoToDelete==='file'){
          var index = this.state.forFileArray.indexOf(rowData)
          this.state.forFileArray.splice(index, 1)
        }
        else{
          var index = this.state.testingArray.indexOf(rowData)
          this.state.testingArray.splice(index, 1)
        }
        
        this.testing()
        alert("deleted")        
      }

      else {
        alert("error");
      }

    });
  }

  numberCounter=()=>{
    counter += 1;
    alert(counter);

    return (null)
  }

  defaultView=()=>{
    return(
    <View>
      
      <Text></Text>
      <Text style={{left:5,fontSize:23}}>Folder</Text>
      <View style={{justifyContent:'center',alignItems: 'center',}}>
        <ListView
        dataSource={this.state.dataSource}
        enableEmptySections="enable"
        renderSeparator={this.ListViewItemSeparator}
        // scrollEnabled={true}
        contentContainerStyle={styles.list}
        renderRow={(rowData) =>
          <Swipeout backgroundColor={'white'} style={{borderRadius:0}} right={this.HaveTowWork(rowData,'folder')} autoClose={true}>
          {/* {this.numberCounter()} */}

          <TouchableOpacity
          delayLongPress={500}x
          style={styles.button1}
          // style={this.state.Noahyek}
          // visible={false}
          onPress={() => { this.CheckingBeforeGoInFunction(rowData) }}
        >
          <Text>      </Text>
          <Icon name='folder' />
          <Text>  </Text>
          <Text style={styles.buttonText}>{rowData}         </Text>
          <TouchableOpacity
            style={styles.button2}
            onPress={() => { this.setState({ visibleModal: 6, moveRowdata: rowData }) }}
          ><Icon name='more-vert' style={{right:0,flex:1}} /></TouchableOpacity>

        </TouchableOpacity>
          </Swipeout>
              
            } />
        </View> 
        <Text></Text>
        <Text style={{left:5,fontSize:23}}>File </Text>

        <View style={{justifyContent:'center',alignItems: 'center',}}>
        
        <ListView
        dataSource={this.state.dataSource2}
        enableEmptySections="enable"
        renderSeparator={this.ListViewItemSeparator}
        contentContainerStyle={styles.list}
        renderRow={(rowData) =>
          <Swipeout backgroundColor={'white'} style={{borderRadius:0}} right={this.HaveTowWork(rowData,'file')} autoClose={true}>
          {/* {this.numberCounter()} */}
          <TouchableOpacity
            delayLongPress={500}x
            style={styles.button1}
            // style={this.state.Noahyek}
            // visible={false}
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
          </Swipeout>
        
              
            } />
          
      </View> 
    </View>
    ) 
  }

tata=()=>{
  if(this.state.timer===2){
    this.setState({isVisible:false,timer:0})
    return(null)
  }
}

openPickDoc=()=>{
  DocumentPicker.show({
    filetype: [DocumentPickerUtil.allFiles()],
  },(error,res) => {
    // Android

    if(!error){
      this.setState({ uploadFileName: res.fileName}, () => {
        this.combineTwoStrings(res);
      });
    }

    // add one toast message for cancel pick doc
  });
}

combineTwoStrings = (res) => {
  // var string1 = "/Documents/";
  var string1 = "/";
  var string2 = string1.concat(this.state.uploadFileName)
  this.setState({ }, () => {
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

  wfs.writeFile(this.state.uploadFileName, blob, "binary", async (err) => {
    if (err) {
      console.error(err.message);
    }
    else {
      console.log("added file =>> ",this.state.uploadFileName);
      alert("added ",this.state.uploadFileName);

       this.state.forFileArray.push(this.state.uploadFileName);
       this.testing();
      
    }
    });
    blob.close();
  }

    createNewFolderAction=()=>{
      const wfs = createWebDAVAdapter(
        this.state.side,
        this.state.username,
        this.state.password,
      );
  
      var combineWord = "/" + this.state.wordForFolder
      wfs.mkdir(combineWord, (err) => {
        if (!err) {
          this.setState({ dialogCreateFolderVisible: false },()=>{
            this.state.testingArray.push(this.state.wordForFolder);
            this.testing();
          })
          
        }
  
        else {
  
        }
      });
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
        
      <Dialog.Container visible={this.state.dialogCreateFolderVisible}>
      <Dialog.Title>Edit file name</Dialog.Title>
      <Dialog.Description>
        Please enter the new folder name:
      </Dialog.Description>
        <Dialog.Input label="Folder name"
          onChangeText={wordForFolder => this.setState({ wordForFolder })}
          style={styles.textInputStyle}
          placeholder="Enter new folder name here"
        />
        <Dialog.Button label="Okay" onPress={() => this.createNewFolderAction()}/> 
        <Dialog.Button label="Cancel" onPress={() => this.setState({ dialogCreateFolderVisible: false })}/>
      </Dialog.Container>
        {this.defaultView()}
        
        </ScrollView> 
        <ActionButton buttonColor="#3498db" offsetY={17} offsetX={15}>
          <ActionButton.Item buttonColor='#3498db' title="Upload File" onPress={() => this.openPickDoc()}>
            <Icon name="folder-open" color='white' />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#3498db' title="New Folder" onPress={() => this.setState({ dialogCreateFolderVisible: true })}>
            <Icon name="folder" color='white' />
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
    backgroundColor: 'transparent',
    borderColor:'transparent',
    borderRadius: 0,
    height: 78,
    marginVertical: 1,
    textAlign: 'center',
    paddingVertical: 12,
    alignItems: 'center',
    flexDirection: 'row'
  },
  subView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "transparent",
    height: 100,
  }
});