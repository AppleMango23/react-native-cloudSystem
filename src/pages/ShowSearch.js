//show ur picture
import React, {Component} from 'react';
import {WebView,BackHandler} from 'react-native';

export default class Succeed extends Component {

  async componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.navigate('Succeed');

      return true;
    });

  }

  componentWillUnmount() {
    this.backHandler.remove();
  }


  static navigationOptions = {
    header:null,
  };
  render() {
    const { navigation } = this.props;
    const data = navigation.getParam('data', 'nothing inside');
    const data1 = navigation.getParam('data1', 'nothing inside');
    const newData = navigation.getParam('newData','nothing inside');

    //this will not work one will use it when all meet up
    var dynamicUrl = "http://d2187bde.ngrok.io/Project/connection.php?path=openFile&uname=" + data + "&pword=" + data1 + "&pathName=Home/" + newData;

    //this one can work but it is static one and require steve to on local network
    var ExampleUrlGoing = "http://192.168.1.100/Project/connection.php?path=openFile&uname=steveshardevelopment@gmail.com&pword=Admin99@steve&pathName=Home/Hello World.docx";;

    var test1 = "http://d2187bde.ngrok.io/Project/connection.php?path=openFile&uname=steveshardevelopment@gmail.com&pword=Admin99@steve&pathName=Home/movie.mp4"
    var test2 = "http://d2187bde.ngrok.io/Project/connection.php?path=openFile&uname=steveshardevelopment@gmail.com&pword=Admin99@steve&pathName=Home/horse.ogg"
    var test3 = "http://d2187bde.ngrok.io/Project/connection.php?path=openFile&uname=steveshardevelopment@gmail.com&pword=Admin99@steve&pathName=Home/horse.mp3"
    
    //below all need to send to something like this https://docs.google.com/viewerng/viewer?url=d2187bde.ngrok.io/Project/Home/Testing.pptx
    var test4 = "http://d2187bde.ngrok.io/Project/connection.php?path=openFile&uname=steveshardevelopment@gmail.com&pword=Admin99@steve&pathName=Home/Testing.pptx"
    var test5 = "http://d2187bde.ngrok.io/Project/connection.php?path=openFile&uname=steveshardevelopment@gmail.com&pword=Admin99@steve&pathName=Home/Hello World.docx"
    var test6 = "http://d2187bde.ngrok.io/Project/connection.php?path=openFile&uname=steveshardevelopment@gmail.com&pword=Admin99@steve&pathName=Home/Hello World.pdf"
    var test7 = "http://d2187bde.ngrok.io/Project/connection.php?path=openFile&uname=steveshardevelopment@gmail.com&pword=Admin99@steve&pathName=Home/Book1.xlsx"

    return (
      <WebView
        // source={{uri: ExampleUrlGoing}}
        source={{uri: "http://192.168.43.55/Bisston_Cloud/webView/search.php"}}
        // injectedJavaScript={`const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=0.5, maximum-scale=0.5, user-scalable=0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `}
        // right=0,
        scalesPageToFit={false}
        startInLoadingState={true}
        style={{marginTop: 24}}
      />
    );
  }
}