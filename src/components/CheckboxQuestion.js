import React, { Component } from "react";
import {
  Text,
  ListItem,
  List,
  Icon,
  Input,
  Item,
  View,
  CheckBox
} from "native-base";
class CheckBoxQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display_other: false
    };
  }
  render() {
    let { onChange, question = {}, value =[]} = this.props;
    const { display_other } = this.state;
    let selectOption = (selectedValue) => {
        if(!value.includes(selectedValue))
        {
          value.push(selectedValue);
        }
        onChange(question.id, value)
    }
    return (
      <List>
        <Text>{question.id}{". "}{question.text}</Text>
        {question.options.map(option => (
          <ListItem key={option.value}>
            <CheckBox
              checked={!display_other && value.includes(option.value)}
              onPress={() => {
                this.setState({ display_other: false });
                selectOption(option.value);
              }}
            />
            <Text onPress={() => {
                this.setState({ display_other: false });
                selectOption(option.value);
              }}> {option.text}</Text>
          </ListItem>
        ))}
        {question.allow_other && (
          <View>
            <ListItem key="other">
              <CheckBox
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

export default CheckBoxQuestion;
