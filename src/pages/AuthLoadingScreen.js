import React, {Component} from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as surveyActions from "../actions/survey";
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

export class AuthLoadingScreen extends Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    const mobileNumber = await AsyncStorage.getItem('WE_CARE_MOBILE_NUMBER');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      ...surveyActions
    },
    dispatch
  );
};
export default connect(null, mapDispatchToProps)(AuthLoadingScreen);