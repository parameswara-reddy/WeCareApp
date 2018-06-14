import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { H2, H3, Form, Item, Input, Label, Button, Text } from "native-base";
import { AsyncStorage } from "react-native";
import { LOGIN_ERROR, ERROR } from "../utils/Messages";
import * as CONSTANTS from "../utils/CONSTANTS";
import WhiteFrame from "../components/WhiteFrame";
import * as Utils from "../helper/Utils";
import { connect } from "react-redux";
import * as UserActions from "../actions/user";
async function storeUser(data) {
  try {
    await AsyncStorage.setItem("wecare_user", JSON.stringify(data));
  } catch (error) {
    alert("Unable to Save data:" + JSON.stringify(error));
  }
}
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = { user: {} };
  }

  register = () => {
    const { user } = this.state;
    const {
      first_name,
      last_name,
      mobile_number,
      email,
      password,
      c_password
    } = user;
    if (password && password != c_password) {
      alert("Passwords does not match");
      return;
    }
    AsyncStorage.removeItem('WE_CARE_MOBILE_NUMBER');
    AsyncStorage.removeItem('wecare_user');
    AsyncStorage.removeItem('WE_CARE_SURVEY_LIST');
    AsyncStorage.setItem("wecare_user", JSON.stringify(user)).then(val => {
      this.props.getUserSuccess(user);
      this.props.navigation.navigate("SignIn");
    });
  };

  onPropertyChange = (name, value) => {
    let { user } = this.state;
    user[name] = value;
    this.setState({ user });
  };

  render() {
    const { user = {} } = this.state;
    const {
      first_name,
      last_name,
      mobile_number,
      email,
      password,
      c_password
    } = user;
    return (
      <WhiteFrame justifyContent="flex-start">
        <Form>
          <Text>Please fill below details</Text>
          <Item fixedLabel>
            <Label>First Name</Label>
            <Input
              autoCapitalize="words"
              value={first_name}
              onChangeText={value => this.onPropertyChange("first_name", value)}
            />
          </Item>
          <Item fixedLabel>
            <Label>Last Name</Label>
            <Input
              autoCapitalize="words"
              value={last_name}
              onChangeText={value => this.onPropertyChange("last_name", value)}
            />
          </Item>
          <Item fixedLabel>
            <Label>Mobile Number</Label>
            <Input
              keyboardType="phone-pad"
              value={mobile_number}
              onChangeText={value =>
                this.onPropertyChange("mobile_number", value)
              }
            />
          </Item>
          <Item fixedLabel>
            <Label>Email</Label>
            <Input
              keyboardType="email-address"
              value={email}
              onChangeText={value => this.onPropertyChange("email", value)}
            />
          </Item>
          <Item fixedLabel>
            <Label>Password</Label>
            <Input
              secureTextEntry={true}
              value={password}
              onChangeText={value => this.onPropertyChange("password", value)}
            />
          </Item>
          <Item fixedLabel>
            <Label>Confirm Password</Label>
            <Input
              secureTextEntry={true}
              value={c_password}
              onChangeText={value => this.onPropertyChange("c_password", value)}
            />
          </Item>
          <Button
            style={{ marginTop: CONSTANTS.MARGIN_MD }}
            primary
            block
            onPress={() => this.register()}
          >
            <Text>Register</Text>
          </Button>
        </Form>
      </WhiteFrame>
    );
  }
}

const mapStateToProps = state => ({
  register: state.register
});
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      ...UserActions
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
