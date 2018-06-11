import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Image, View, StyleSheet } from "react-native";
import CoverImage from "../assets/cover.jpeg";
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
  Body
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
  render() {
    const { loggedInUser = {}, survey } = this.props;
    return (
      <WhiteFrame justifyContent="flex-start">
        <H1>Hi {loggedInUser.name},</H1>
        <H3>{this.getGreeting()}</H3>
        <Grid style={{ marginVertical: 10 }}>
          <Col>
            <Card>
              <Header>
                <Text style={{ fontSize: 40, color: "#FFFFFF", padding: 5 }}>
                  {survey.surveyList.length}
                </Text>
              </Header>
              <Body style={{ padding: 10 }}>
                <H3>Surveys</H3>
              </Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Header>
                <Text style={{ fontSize: 40, color: "#FFFFFF", padding: 5 }}>
                  Reports
                </Text>
              </Header>
              <Body style={{ padding: 10 }}>
                <H3>Coming soon</H3>
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
export default connect(
  mapStateToProps,
  null
)(HomePage);
