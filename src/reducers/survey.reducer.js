import * as surveyActions from "../actions/survey";
import { AsyncStorage } from "react-native";

const saveSurvey = async (data) => {
  await AsyncStorage.setItem("WE_CARE_SURVEY_LIST", JSON.stringify(data));
}

const initialState = {
  surveyList: []
};
export default survey = (state = initialState, action) => {
  switch (action.type) {
    case surveyActions.UPDATE_SURVEY: {
      let surveyList = (state.surveyList||[]);
      surveyList.push(action.payload);
      saveSurvey(surveyList);
      return Object.assign({}, state, {surveyList});
    }
    case surveyActions.SET_SURVEYS: {
      let surveyList = action.payload || [];
      saveSurvey(surveyList);
      return Object.assign({}, state, {surveyList});
    }
    default:
      return state;
  }
};
