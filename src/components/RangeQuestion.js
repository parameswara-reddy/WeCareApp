import React, { Component } from "react";
import { Form, Item, Text, Input, Right, Left, Content, Container } from "native-base";
import { View, Slider } from "react-native";
const RangeQuestion = props => {
  const { onChange, question = {}, value } = props;
  question.hint = question.hint || "Please provide your answer here";
  const keyboard = "visible-password";
  const val = value && value.value;
  return (
    <Form style={{ width: "100%" }}>
      <Text>{question.id}{". "}{question.text}</Text>
      <View style={{ margin: 10 }}>
        <Slider
          value={val}
          minimumValue={question.minimumValue}
          maximumValue={question.maximumValue}
          step={1}
          onSlidingComplete={value => onChange(question.id, {value:value, 'text':value})}
        />
      </View>
      <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}>
        <Left><Text>{question.minimumValue} - Not at all</Text></Left>
        <Right><Text>{question.maximumValue} - Extremely</Text></Right>
      </View>
      <View style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}>
        <Text>Your answer is: {val || question.minimumValue}</Text>
      </View>
    </Form>
  );
};

export default RangeQuestion;
