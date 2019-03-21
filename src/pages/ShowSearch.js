//show ur picture
import React, {Component} from 'react';
import {WebView,BackHandler,View,Text} from 'react-native';

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

    console.log("hey2");
    

    return (
      <View>
        <Text>test</Text>
      </View>
      // <WebView
      //   // source={{uri: ExampleUrlGoing}}
      //   source={{uri: "http://192.168.43.55/Bisston_Cloud/webView/search.php"}}
      //   // injectedJavaScript={`const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=0.5, maximum-scale=0.5, user-scalable=0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `}
      //   // right=0,
      //   scalesPageToFit={false}
      //   startInLoadingState={true}
      //   style={{marginTop: 24}}
      // />
    );
  }
}