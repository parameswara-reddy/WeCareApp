/**
 * This component will contain sign in screen
 * @author Parameswara Reddy
 */
import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { View, Alert, Image, AsyncStorage } from "react-native";
import { H1, Form, Item, Input, Label, Icon, Button, Text } from "native-base";
import * as CONSTANTS from "../utils/CONSTANTS";
import * as UserActions from "../actions/user";
import WhiteFrame from "../components/WhiteFrame";
import logo from "../assets/WeCareLogo.jpg";
import * as surveyActions from "../actions/survey";
class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileNumber: "",
      password: ""
    };
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    const mobileNumber = await AsyncStorage.getItem('WE_CARE_MOBILE_NUMBER');
    this.setState({mobileNumber});
  }

  onMobileNumberChange = mobileNumber => {
    this.setState({ mobileNumber });
  };
  onPasswordChange = password => {
    this.setState({ password });
  };
  isFormValid = () => {
    const { mobileNumber, password } = this.state;
    if (
      !mobileNumber ||
      mobileNumber.length < CONSTANTS > CONSTANTS.MOBILE_NUMBER_LENGTH
    ) {
      return false;
    }
    if (!password || password.length < CONSTANTS.PASSWORD_LENGTH) {
      return false;
    }
    return true;
  };
  login = async () => {
    const { mobileNumber, password } = this.state;
    const {getUserSuccess, navigation} = this.props;
    if(mobileNumber == "+17039353757" && password == "4005") {
      AsyncStorage.setItem('WE_CARE_MOBILE_NUMBER', mobileNumber);
      const surveyList = await AsyncStorage.getItem("WE_CARE_SURVEY_LIST");
      this.props.setSurveys(JSON.parse(surveyList));
      const data = {
        mobile_number: "+17039353757",
        name: "Parameswara Reddy"
      };
      getUserSuccess(data);
      navigation.navigate("Dashboard");
    } else {
      alert("Invalid Mobile number or password");
    }
  };
  forgotPassword = () => {
    Alert.alert(ERROR, "Forgot password");
  };
  render() {
    const { mobileNumber, password } = this.state;
    return (
      <WhiteFrame>
        <Form style={{ marginTop: 0 }}>
          <View style={{padding: 20, display: 'flex', flex: 1, alignItems: 'center'}}>
            <Image source={logo} />
          </View>
          <Item floatingLabel>
            <Label>Mobile Number</Label>
            <Icon name="phone-portrait" />
            <Input
              selectTextOnFocus={true}
              autoFocus={true}
              keyboardType="phone-pad"
              returnKeyType="next"
              value={mobileNumber}
              onChangeText={text => this.onMobileNumberChange(text)}
            />
          </Item>
          <Item floatingLabel>
            <Label>PIN</Label>
            <Icon name="lock" />
            <Input
              selectTextOnFocus={true}
              secureTextEntry={true}
              value={password}
              keyboardType="number-pad"
              onChangeText={text => this.onPasswordChange(text)}
            />
          </Item>
          <Button
            style={{ marginTop: CONSTANTS.MARGIN_MD }}
            primary
            block
            disabled={!this.isFormValid()}
            onPress={() => this.login()}
          >
            <Text>Login</Text>
          </Button>
        </Form>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",
            paddingHorizontal: CONSTANTS.PADDING_MD,
            paddingTop: CONSTANTS.PADDING_MD
          }}
        >
          <Text
            style={{
              textDecorationLine: "underline"
            }}
            onPress={() => {
              this.createAccount();
            }}
          >
            Don't have account?
          </Text>
          <Text
            style={{
              textDecorationLine: "underline"
            }}
            onPress={() => {
              this.forgotPassword();
            }}
          >
            Forgot password?
          </Text>
        </View>
      </WhiteFrame>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      ...UserActions, ...surveyActions
    },
    dispatch
  );
};
export default connect(null, mapDispatchToProps)(LoginPage);