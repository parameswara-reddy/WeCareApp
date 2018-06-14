import React, { Component } from "react";
import { Form, Item, Text, Input } from "native-base";
import { View, TextInput } from "react-native";
const NumberQuestion = props => {
  const { onChange, question = {}, value } = props;
  question.hint = question.hint || "Please provide your answer here";
  const keyboard = "numeric";
  return (
    <Form style={{ width: "100%" }}>
      <Text>{question.id}{". "}{question.text}</Text>
      <Item underline>
        <Input
          value={value.value}
          placeholder={question.hint}
          onChangeText={(text)=> onChange(question.id, {value:text,text:text})}
          keyboardType={keyboard}
        />
      </Item>
    </Form>
  );
};

export default NumberQuestion;
