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
import * as csvExporter from "../utils/csvExporter";
import MailCompose from "react-native-mail-compose";
class SurveyReport extends Component {
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
  sendEmail = async () => {
    const { loggedInUser = {}, survey } = this.props;
    const {first_name, last_name, mobile_number, email} = loggedInUser;
    let mailData = {...survey, first_name, last_name, mobile_number, email};
    try {
      await MailCompose.send({
        toRecipients: ["i.yaroslavsky@csuohio.edu", "s.hurtadorua@csuohio.edu", "k.scamaldo@vikes.csuohio.edu"],
        ccRecipients: [loggedInUser.email],
        bccRecipients: [],
        subject: "Survey update from " + loggedInUser.first_name + " " + loggedInUser.last_name,
        html:
          "<p>Hi Team,<br> Below is my opioid survey result and i have attached survey data.<br><br>Regards,<br>" +
          + (loggedInUser.first_name + " " + loggedInUser.last_name) +
          "</p>", // Or, use this if you want html body. Note that some Android mail clients / devices don't support this properly.
        attachments: [
          {
            filename: "survey-data", // [Optional] If not provided, UUID will be generated.
            ext: ".csv",
            mimeType: "text/csv",
            text: JSON.stringify(mailData, undefined, "\t") //, // Use this if the data is in UTF8 text.
            //data: '...BASE64_ENCODED_STRING...', // Or, use this if the data is not in plain text.
          },
          {
            filename: "chart", // [Optional] If not provided, UUID will be generated.
            ext: ".png",
            mimeType: "image/png",
            //text: JSON.stringify(survey) //, // Use this if the data is in UTF8 text.
            data: this.state.chart, // Or, use this if the data is not in plain text.
          }
        ]
      });
    } catch (e) {
      // e.code may be 'cannotSendMail' || 'cancelled' || 'saved' || 'failed'
    }
  };
  render() {
    const { loggedInUser = {}, survey = {} } = this.props;
    const surveyList = survey.surveyList || [];
    surveyList.sort((a,b) => new Date(a.createdAt) > new Date(b.createdAt));
    let listObject = {};
    surveyList.forEach(element => {
        let date = new Date(element.createdAt);
        let month = date.getMonth() + 1; //months from 1-12
        let day = date.getDate();
        let obj = listObject[month + "/" + day] || {};
        let answers = element.answers || {};
        let craving = parseInt(((answers["6"]||{}).value)||0);
        obj[date.getHours()] = craving;
        listObject[month + "/" + day] = obj;
    });
    return (
      <WhiteFrame justifyContent="flex-start">
        <Segment>
          <Left>
            <Button onPress={this.gotoHome} info>
              <Text>Home</Text>
            </Button>
          </Left>
          <Right>
            <Button onPress={this.sendEmail} primary>
              <Text>Send Email</Text>
            </Button>
          </Right>
        </Segment>
        <ViewShot onCapture={this.onCapture} captureMode="mount" options={{ format: "png", quality: 0.9, result: "base64" }}>
          {Object.keys(listObject).map(key => {
              let data  = listObject[key];
              data = Array.from(new Array(25), (val, i) => data[i]);
              return (<LineChart key={key} label={key} data={data}/>)
          })}
          
          
        </ViewShot>
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
)(SurveyReport);
