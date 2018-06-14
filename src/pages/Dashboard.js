import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Image, View, StyleSheet, AsyncStorage } from "react-native";
import CoverImage from "../assets/cover.jpeg";
import WhiteFrame from "../components/WhiteFrame";
import * as surveyActions from "../actions/survey";
import * as UserActions from "../actions/user";
import {
  Right,
  Button,
  Text,
  Icon,
  Grid,
  Row,
  Col,
  CardItem,
  Card,
  H1,
  H3,
  Header,
  Body,
  Segment,
  Left
} from "native-base";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  startSurvey = () => {
    this.props.navigation.push("Survey", { questionId: 1 });
  };
  gotoPage = name => {
    this.props.navigation.push(name);
  };
  getGreeting = () => {
    var d = new Date();
    var time = d.getHours();

    if (time < 12) {
      return "Good morning!";
    }
    if (time > 16) {
      return "Good afternoon!";
    }
    return "Good evening!";
  };

  deleteAccount = () => {
    this.props.getUserSuccess({});
    AsyncStorage.removeItem('WE_CARE_MOBILE_NUMBER');
    AsyncStorage.removeItem('wecare_user');
    AsyncStorage.removeItem('WE_CARE_SURVEY_LIST');
    this.props.navigation.navigate("SignIn");
  }

  logout = () => {
    this.props.navigation.navigate("SignIn");
  }

  render() {
    const { loggedInUser = {}, survey } = this.props;
    return (
      <WhiteFrame justifyContent="flex-start">
        <H1>Hi {loggedInUser.first_name + " " + loggedInUser.last_name},</H1>
        <H3>{this.getGreeting()}</H3>
        <Grid style={{ marginVertical: 10 }}>
          <Col>
            <Card>
              <Header>
                <Text style={{ fontSize: 40, color: "#FFFFFF", padding: 5 }}>
                  {survey.surveyList.length + ""}
                </Text>
              </Header>
              <Body style={{ padding: 10 }}>
                <H3>Surveys</H3>
              </Body>
            </Card>
          </Col>
          <Col>
            <Card >
              <Header>
                <Text style={{ fontSize: 40, color: "#FFFFFF", padding: 5 }}>
                  Reports
                </Text>
              </Header>
              <Body style={{ padding: 10 }}>
                <Text onPress={() => this.props.navigation.push("SurveyReport")} style={{
              textDecorationLine: "underline"
            }}>View Reports</Text>
              </Body>
            </Card>
          </Col>
        </Grid>
        <Button
          block
          primary
          style={{ marginVertical: 20 }}
          onPress={() => this.startSurvey()}
        >
          <Text>Start Survey</Text>
        </Button>
        <Segment>
          <Left>
            <Text
              style={{
                textDecorationLine: "underline"
              }}
              onPress={() => {
                this.deleteAccount();
              }}
            >
              Delete My Account
            </Text>
          </Left>
          <Right>
            <Text
              style={{
                textDecorationLine: "underline"
              }}
              onPress={() => {
                this.logout();
              }}
            >
              Logout
            </Text>
          </Right>
        </Segment>
      </WhiteFrame>
    );
  }
}
const styles = StyleSheet.create({
  center: {
    flex: 1,
    flexDirection: "column",
    alignContent: "center",
    alignItems: "center",
    padding: 10
  }
});
const mapStateToProps = state => {
  return {
    loggedInUser: state.users.loggedInUser,
    survey: state.survey
  };
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      ...surveyActions,
      ...UserActions
    },
    dispatch
  );
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
