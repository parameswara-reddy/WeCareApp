import React, { Component } from 'react';
import { AppRegistry } from "react-native";
import App from "./App";
import { initStore } from "./src/store";
import { Provider } from "react-redux";

const OpioidSurvey = () => (
    <Provider store={initStore()}>
        <App />
    </Provider>
);

AppRegistry.registerComponent("WeCare", () => OpioidSurvey);
