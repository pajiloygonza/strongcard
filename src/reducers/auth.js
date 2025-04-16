import { AUTH } from "../actions/auth";

const initialState = {
  token: null,
  logged: null,
  user: null,
};

export const auth = (state = initialState, action) => {
  switch (action.type) {
    case AUTH.SET_DATA:
      return {
        ...state,
        token: action.token,
        user: action.user,
        logged: action.logged,
      };

    default:
      return state;
  }
};
