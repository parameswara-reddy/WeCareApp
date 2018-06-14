import React, {Component} from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as surveyActions from "../actions/survey";
import * as UserActions from "../actions/user";
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
    let user = await AsyncStorage.getItem('wecare_user');
    user = user ? JSON.parse(user) : {};
    this.props.getUserSuccess(user);
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
      ...surveyActions,
      ...UserActions
    },
    dispatch
  );
};
export default connect(null, mapDispatchToProps)(AuthLoadingScreen);