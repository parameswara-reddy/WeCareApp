import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as surveyActions from "../actions/survey";
import {
  Card,
  CardItem,
  Body,
  Text,
  Radio,
  ListItem,
  CheckBox,
  List,
  DeckSwiper,
  Segment,
  Right,
  Left,
  Button,
  Icon,
  H3,
  H1
} from "native-base";
import RadioQuestion from "../components/RadioQuestion";
import CheckboxQuestion from "../components/CheckboxQuestion";
import TextQuestion from "../components/TextQuestion";
import RangeQuestion from "../components/RangeQuestion";
import NumberQuestion from "../components/NumberQuestion";
import MatrixQuestion from "../components/MatrixQuestion";
import { View, BackHandler, Animated } from "react-native";
import WhiteFrame from "../components/WhiteFrame";

class Survey extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 29,
      answerMap: {},
      questionStack: [],
      surveySubmit: false
    };
  }

  onAnswer = (id, value) => {
    const questions = this.props.questions;
    let answerMap = this.state.answerMap;
    answerMap[id] = value;
    this.setState({ answerMap });
  };
  moveToPreviousQuestion = () => {
    const { questionStack } = this.state;
    this.setState({ submitSurvey: false });
    this.props.navigation.navigate("Survey", {
      questionId: questionStack.pop(),
      surveyConfirm: false
    });
  };
  moveToNextQuestion = () => {
    const { questions = [] } = this.props;
    const { questionStack, answerMap } = this.state;
    const { params } = this.props.navigation.state;
    const activeIndex = params.questionId || 1;
    const conditions = questions.find(question => question.id == activeIndex)
      .conditions;
    if (conditions[answerMap[activeIndex]]) {
      nextQuestionId = conditions[answerMap[activeIndex]];
    } else {
      nextQuestionId = conditions["*"];
    }
    questionStack.push(params.questionId);
    this.setState({ questionStack });
    if (nextQuestionId != "END" && nextQuestionId) {
      this.props.navigation.push("Survey", {
        questionId: nextQuestionId
      });
    } else {
      this.setState({ submitSurvey: true });
      this.props.navigation.navigate("Survey", {
        questionId: nextQuestionId,
        surveyConfirm: true
      });
    }
  };

  submitSurvey = () => {
    const { questionStack, answerMap } = this.state;
    const survey = {
      createdAt: new Date(),
      mobileNumber: this.props.loggedInUser.mobileNumber,
      answers: answerMap
    };
    this.props.updateSurvey(survey);
    this.props.navigation.navigate("SurveySummay");
  };

  getQuestionComponent = question => {
    const { answerMap } = this.state;
    let props = {
      question: question,
      onChange: this.onAnswer,
      value: answerMap[question.id]
    };
    switch (question.type) {
      case "radio":
        return <RadioQuestion {...props} />;
      case "checkbox":
        return <CheckboxQuestion {...props} />;
      case "matrix":
        return <MatrixQuestion {...props} />;
      case "range":
        return <RangeQuestion {...props} />;
      case "number":
        return <NumberQuestion {...props} />;
      default:
        return <TextQuestion {...props} />;
    }
  };

  getInterpolatedQuestion = (tpl, args) =>
    tpl.replace(/\${(\w+)}/g, (_, v) => args[v]);

  render() {
    const { questions = [], survey } = this.props;
    const { params } = this.props.navigation.state;
    const activeIndex = params.questionId || 1;
    const surveyConfirm = params.surveyConfirm || false;
    const { answerMap, questionStack, surveySubmit = false } = this.state;
    const question = questions.find(q => q.id == activeIndex);
    const displayConfirmation = surveyConfirm || surveySubmit;
    if (question && question.text) {
      question.text = this.getInterpolatedQuestion(question.text, answerMap);
    }
    return (
      <WhiteFrame>
        {questions.length == 0 && <Text>Questions Not Available</Text>}
        {!displayConfirmation &&
          questions.length > 0 &&
          question && (
            <View>
              <Animated.View>
                <Card key={question.id}>
                  <CardItem>
                    <Body>{this.getQuestionComponent(question)}</Body>
                  </CardItem>
                </Card>
              </Animated.View>
              <Segment style={{ marginTop: 20 }}>
                {questionStack.length > 0 && (
                  <Left>
                    <Button
                      primary
                      onPress={() => this.moveToPreviousQuestion()}
                    >
                      <Icon name="arrow-back" />
                      <Text>Previous</Text>
                    </Button>
                  </Left>
                )}
                <Right>
                  <Button primary onPress={() => this.moveToNextQuestion()}>
                    <Text>Next</Text>
                    <Icon name="arrow-forward" />
                  </Button>
                </Right>
              </Segment>
              <View style={{ marginTop: 20 }}>
                {question.hints &&
                  question.hints.map(hint => (
                    <Text key={hint} style={{ marginTop: 10 }}>
                      {hint}
                    </Text>
                  ))}
              </View>
            </View>
          )}
        {displayConfirmation && (
          <View style={{ paddingVertical: 50 }}>
            <H1>You survey completed. Are you sure you want to submit?</H1>
            <Segment>
              {questionStack.length > 0 && (
                <Left>
                  <Button primary onPress={() => this.moveToPreviousQuestion()}>
                    <Icon name="arrow-back" />
                    <Text>No</Text>
                  </Button>
                </Left>
              )}
              <Right>
                <Button primary onPress={() => this.submitSurvey()}>
                  <Text>Submit Survey</Text>
                  <Icon name="checkmark-circle" />
                </Button>
              </Right>
            </Segment>
          </View>
        )}
      </WhiteFrame>
    );
  }
}
const mapStateToProps = state => {
  return {
    questions: state.questions,
    survey: state.survey,
    loggedInUser: state.users.loggedInUser
  };
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      ...surveyActions
    },
    dispatch
  );
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Survey);
