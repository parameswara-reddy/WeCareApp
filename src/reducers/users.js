import * as userActions from "../actions/user"
const initialState = {
  userList: [],
  loggedIn: false,
  loggedInUser: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case userActions.GET_USER_SUCCESS: 
      return Object.assign({}, state, {loggedInUser: action.payload});
    default:
      return state;
  }
};
export default reducer;