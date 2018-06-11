import React, { Component } from "react";
import {
  Text,
  Radio,
  ListItem,
  List,
  Icon,
  Input,
  Item,
  View
} from "native-base";
class RadioQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display_other: false
    };
  }
  render() {
    const { onChange, question = {}, value } = this.props;
    const { display_other } = this.state;
    return (
      <List>
        <Text>{question.id}{". "}{question.text}</Text>
        {question.options.map(option => (
          <ListItem key={option.value}>
            <Radio
              selected={!display_other && value == option.value}
              onPress={() => {
                this.setState({ display_other: false });
                onChange(question.id, option.value);
              }}
            />
            <Text onPress={() => {
                this.setState({ display_other: false });
                onChange(question.id, option.value);
              }}> {option.text}</Text>
          </ListItem>
        ))}
        {question.allow_other && (
          <View>
            <ListItem key="other">
              <Radio
                selected={display_other}
                onPress={() => this.setState({ display_other: true })}
              />
              <Text> Others (Please specify)</Text>
            </ListItem>
            {display_other && (
              <ListItem key="other_text">
                <Input
                  value={question.value}
                  onChangeText={text => onChange(question.id, text)}
                  placeholder="Please type here"
                  value={value}
                />
              </ListItem>
            )}
          </View>
        )}
      </List>
    );
  }
}

export default RadioQuestion;
