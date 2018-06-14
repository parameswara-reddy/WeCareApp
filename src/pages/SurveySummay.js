import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Image, View, StyleSheet } from "react-native";
import LineChart from "../components/LineChart";
import ViewShot from "react-native-view-shot";

import WhiteFrame from "../components/WhiteFrame";
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
import MailCompose from "react-native-mail-compose";
class SurveySummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chart: ""
    };
  }

  onCapture = uri => {
    console.log("do something with ", uri);
    this.setState({chart:uri});
  }

  gotoHome = () => {
    this.props.navigation.navigate("Dashboard");
  };
  viewReports = async () => {
    this.props.navigation.navigate("SurveyReport");
  };
  render() {
    const { loggedInUser = {}, survey } = this.props;
    return (
      <WhiteFrame justifyContent="flex-start">
        <H1>
          Thank you {loggedInUser.first_name + " " + loggedInUser.last_name} for taking time to complete the survey.
        </H1>
        <Button onPress={this.gotoHome} info block style={{marginVertical: 20}}>
          <Text>Home</Text>
        </Button>
        <Button onPress={this.viewReports} primary block style={{marginVertical: 20}}>
          <Text>View Reports</Text>
        </Button>
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
  },
  chart: {
    height: 300,
    width: 300
  }
});
const mapStateToProps = state => {
  return {
    loggedInUser: state.users.loggedInUser,
    survey: state.survey
  };
};
export default connect(
  mapStateToProps,
  null
)(SurveySummary);
