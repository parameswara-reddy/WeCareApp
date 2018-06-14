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
    let selectOption = (selectedValue) => {
        if(value.filter(val => (val.value == selectedValue.value)).length == 0)
        {
          value.push(selectedValue);
        } else {
          value = value.filter(val => val.value != selectedValue.value);
        }
        onChange(question.id, value)
    }
    const keys = value.map(val => val.value);
    const display_other = (value.filter(val => val.text == '_Other_').length > 0);
    const display_other_value = display_other && (value.find(val => val.text == '_Other_').value);
    return (
      <List>
        <Text>{question.id}{". "}{question.text}</Text>
        {question.options.map(option => (
          <ListItem key={option.value}>
            <CheckBox
              checked={keys.includes(option.value)}
              onPress={() => {
                selectOption(option);
              }}
            />
            <Text onPress={() => {
                selectOption(option);
              }}> {option.text}</Text>
          </ListItem>
        ))}
        {question.allow_other && (
          <View>
            <ListItem key="other">
              <CheckBox
                selected={display_other}
                onPress={() => selectOption({value:'', 'text':"_Other_"})}
              />
              <Text> Others (Please specify)</Text>
            </ListItem>
            {display_other && (
              <ListItem key="other_text">
                <Input
                  value={question.value}
                  onChangeText={text => selectOption({value:text, 'text':"_Other_"})}
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
