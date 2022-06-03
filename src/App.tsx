import React, {Component} from 'react';
import {StatusBar, Platform} from 'react-native';
import Routes from './Routes';
import colors from './config/colors';

class App extends Component {
  async componentDidMount() {
    if (!Platform.OS) {
      StatusBar.setBarStyle('light-content', true);
      StatusBar.setBackgroundColor(colors.secondary);
    }
    if (Platform.OS) {
      StatusBar.setBarStyle('light-content', true);
    }
  }

  render() {
    return <Routes />;
  }
}
export default App;
