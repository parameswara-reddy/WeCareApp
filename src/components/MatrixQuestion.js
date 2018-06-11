import React, { Component } from "react";
import {
  Form,
  Item,
  Text,
  Input,
  Grid,
  Row,
  Col,
  View,
  List,
  ListItem,
  Radio
} from "native-base";
const MatrixQuestion = props => {
  let { onChange, question = {}, value = {} } = props;
  const bgs = { 0: "#FFFFFF", 1: "#E3E3E3" };
  let optionSelected = (id, selectedValue) => {
    value[id] = selectedValue;
    onChange(question.id, value);
  };
  return (
    <View style={{ width: "100%" }}>
      <Text style={{paddingVertical: 10}}>{question.id}{". "}{question.text}</Text>
      <Grid>
        <Row style={{ backgroundColor: "#D3D3D3", paddingVertical: 5 }}>
          <Col key={-1} />
          {question.choices.map((choice, i) => (
            <Col key={choice.value}>
              <Text
                style={{
                  fontSize: 14,
                  textAlign: "center",
                  paddingHorizontal: 5
                }}
              >
                {choice.text}
              </Text>
            </Col>
          ))}
        </Row>
        {question.questions.map((q, i) => (
          <Row key={q.id} style={{ backgroundColor: bgs[i % 2], paddingVertical: 5 }}>
            <Col key={-1} size={2.5}>
              <Text
                style={{
                  fontSize: 14,
                  textAlign: "center",
                  paddingHorizontal: 5
                }}
              >
                {q.text}
              </Text>
            </Col>
            {question.choices.map(choice => (
              <Col
                size={1}
                key={choice.value}
                alignContent="center"
                justifyContent="center"
                style={{
                  marginHorizontal: 5,
                  paddingHorizontal: 10
                }}
              >
                <Radio
                  selected={choice.value == value[q.id]}
                  onPress={() => {
                    optionSelected(q.id, choice.value);
                  }}
                />
              </Col>
            ))}
          </Row>
        ))}
      </Grid>
    </View>
  );
};

export default MatrixQuestion;
