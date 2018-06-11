import * as actionTypes from "../actionTypes";
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';

export function getUserSuccess(data) {
  return {
    type: GET_USER_SUCCESS,
    payload: data
  }
}
