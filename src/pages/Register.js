import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { H2, H3, Form, Item, Input, Label, Button, Text } from "native-base";
import { LOGIN_ERROR, ERROR } from "../utils/Messages";
import * as CONSTANTS from "../utils/CONSTANTS";
import WhiteFrame from "../components/WhiteFrame";
import * as Utils from "../helper/Utils";
import { connect } from "react-redux";
import * as UserActions from "../actions/user";
async function storeUser(data) {
  try {
    await AsyncStorage.setItem("user", JSON.stringify(data));
  } catch (error) {
    alert("Unable to Save data:" + JSON.stringify(error));
  }
}
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = { user: {}};
  }
  
  register = () => {
    const {user} = this.state;
    AsyncStorage.setItem("user", JSON.stringify(data)).then(val => {
      this.props.register(user);
      this.props.navigation.navigate('SignIn');
    });
  }

  onPropertyChange = (name, value) => {
    let {user} = this.state;
    user[name] = value;
    this.setState({user});
  }

  render() {
    return (
      <WhiteFrame justifyContent="flex-start">
        <H2>Hello {this.props.register.name}, {Utils.getGreeting()}</H2>
        <Form>
          <Text>Please fill below details</Text>
          <Item floatingLabel>
            <Label>First Name</Label>
            <Input autoCapitalize="words" onChangeText={(value)=> this.onPropertyChange('first_name', value)}/>
          </Item>
          <Item floatingLabel>
            <Label>Last Name</Label>
            <Input  onChangeText={(value)=> this.onPropertyChange('last_name', value)}/>
          </Item>
          <Item floatingLabel>
            <Label>Mobile Number</Label>
            <Input keyboardType="phone-pad"  onChangeText={(value)=> this.onPropertyChange('mobile_number', value)}/>
          </Item>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input keyboardType="email-address"  onChangeText={(value)=> this.onPropertyChange('email', value)}/>
          </Item>
          <Item floatingLabel>
            <Label>Password</Label>
            <Input secureTextEntry={true}  onChangeText={(value)=> this.onPropertyChange('password', value)}/>
          </Item>
          <Item floatingLabel>
            <Label>Confirm Password</Label>
            <Input secureTextEntry={true}  onChangeText={(value)=> this.onPropertyChange('c_password', value)}/>
          </Item>
          <Button style={{ marginTop: CONSTANTS.MARGIN_MD }} primary block onPress= {()=> this.register()}>
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

export default connect(mapStateToProps, mapDispatchToProps)(Register);
