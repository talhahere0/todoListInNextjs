import * as Actions from "../actions";

const initialState = {
  isLoggedIn: false,
  data: {},
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case Actions.LOG_IN:
      return {
        ...state,
        isLoggedIn: true,
        data: {
          ...state.data,
          ...action.payload,
        },
      };
    case Actions.LOG_OUT:
      return initialState;

    default:
      return state;
  }
}
