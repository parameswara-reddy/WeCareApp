import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Image, View, StyleSheet } from "react-native";

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
import MailCompose from 'react-native-mail-compose';
class SurveySummary extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  gotoHome = () => {
    this.props.navigation.navigate("Dashboard");  
  }
  sendEmail = async () => {
    const { loggedInUser = {}, survey } = this.props;
    try {
        await MailCompose.send({
          toRecipients: ['parameswara_reddy@outlook.com'],
          ccRecipients: ['apreddyvce@gmail.com', loggedInUser.email],
          bccRecipients: [],
          subject: 'Survey update from ' + loggedInUser.name,
          html: '<p>Hi Team,<br> Below is my opioid survey result and i have attached survey data<br><br>Regards,<br>'+loggedInUser.name+'</p>', // Or, use this if you want html body. Note that some Android mail clients / devices don't support this properly.
          attachments: [{
            filename: 'survey-data', // [Optional] If not provided, UUID will be generated.
            ext: '.json',
            mimeType: 'application/json',
            text: JSON.stringify(survey)//, // Use this if the data is in UTF8 text.
            //data: '...BASE64_ENCODED_STRING...', // Or, use this if the data is not in plain text.
          }],
        });
      } catch (e) {
        // e.code may be 'cannotSendMail' || 'cancelled' || 'saved' || 'failed'
      }
  }
  render() {
    const { loggedInUser = {}, survey } = this.props;
    return (
      <WhiteFrame justifyContent="flex-start">
        <H1>Thank you {loggedInUser.name} for taking time and taking survey.</H1>
        <Segment>
            <Left>
                <Button onPress={this.gotoHome} info>
                    <Text>Home
                    </Text>
                </Button>
            </Left>
            <Right>
                <Button onPress={this.sendEmail} primary>
                    <Text>Send Email
                    </Text>
                </Button>
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
export default connect(
  mapStateToProps,
  null
)(SurveySummary);
