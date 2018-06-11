import { createSwitchNavigator, createStackNavigator } from "react-navigation";
import React, { Component } from "react";
import { connect } from "react-redux";
import AuthLoadingScreen from "./src/pages/AuthLoadingScreen";
import Dashboard from "./src/pages/Dashboard";
import LoginPage from "./src/pages/LoginPage";
import Register from "./src/pages/Register";
import SignIn from "./src/pages/LoginPage";
import Survey from "./src/pages/Survey";

const AppStack = createStackNavigator({ Dashboard: Dashboard, Survey: Survey  }, { header: null, headerMode: "none" });
const AuthStack = createStackNavigator({ SignIn: SignIn }, { header: null, headerMode: "none" });

const AppNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack
  },
  {
    initialRouteName: "AuthLoading"
  }
);

 class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <AppNavigator />;
  }
}
export default connect(null, null)(App);