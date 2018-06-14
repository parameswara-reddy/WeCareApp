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
    const { onChange, question = {}, value = {} } = this.props;
    const display_other = value.text === "_Others_";
    const val = value.value;
    return (
      <List>
        <Text>
          {question.id}
          {". "}
          {question.text}
        </Text>
        {question.options.map(option => (
          <ListItem key={option.value}>
            <Radio
              selected={val == option.value}
              onPress={() => {
                onChange(question.id, option);
              }}
            />
            <Text
              onPress={() => {
                onChange(question.id, option);
              }}
            >
              {" "}
              {option.text}
            </Text>
          </ListItem>
        ))}
        {question.allow_other && (
          <View>
            <ListItem key="other">
              <Radio
                selected={display_other}
                onPress={() =>
                  onChange(question.id, { value: "", text: "_Others_" })
                }
              />
              <Text> Others (Please specify)</Text>
            </ListItem>
            {display_other && (
              <ListItem key="other_text">
                <Input
                  onChangeText={text =>
                    onChange(question.id, { value: text, text: "_Others_" })
                  }
                  placeholder="Please type here"
                  value={val}
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
