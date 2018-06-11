import React, { Component } from "react";
import { Form, Item, Text, Input } from "native-base";
import { View } from "react-native";
const TextQuestion = props => {
  const { onChange, question = {}, value } = props;
  question.hint = question.hint || "Please provide your answer here";
  return (
    <Form style={{ width: "100%" }}>
      <Text>{question.id}{". "}{question.text}</Text>
      <Item underline>
        <Input
          value={question.value}
          onChangeText={text => onChange(question.id, text)}
          placeholder={question.hint}
          value={value}
          multiline={true}
        />
      </Item>
    </Form>
  );
};

export default TextQuestion;
