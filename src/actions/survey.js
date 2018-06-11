export const UPDATE_SURVEY = 'UPDATE_SURVEY';

export const updateSurvey = data => ({
    type: UPDATE_SURVEY,
    payload: data
});

export const SET_SURVEYS = 'SET_SURVEYS';

export const setSurveys = (data) => ({
    type: SET_SURVEYS,
    payload: data
});