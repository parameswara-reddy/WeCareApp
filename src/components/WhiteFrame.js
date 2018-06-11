import React, { Component } from 'react';
import { View, ImageBackground } from "react-native";
import * as CONSTANTS from "../utils/CONSTANTS";
import CSUImage from "../assets/csu.jpg";
import { Container, Content } from 'native-base';
export default (WhiteFrame = props => {
  return (
    <Container>
    <ImageBackground
      source={CSUImage}
      style={{ width: "100%", height: "100%", display: "flex" }}
      resizeMode="stretch"
    >
      <View
        style={{
          padding: 0,
          flex: 1,
          flexDirection: "column",
          justifyContent: props.justifyContent || "center"
        }}
      >
        <Content
          style={{
            backgroundColor: "rgba(256,256,256,0.85)",
            borderRadius: CONSTANTS.BORDER_RADIUS_DEFAULT,
            padding: CONSTANTS.PADDING_MD
          }}
        >
          {props.children}
        </Content>
      </View>
    </ImageBackground>
    </Container>
  );
});
