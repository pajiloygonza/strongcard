import { SIGNUP } from "../actions/signup";
import {
  initRequestState,
  resetRequestStatus,
  setRequestError,
  setRequestPending,
  setRequestSuccess,
} from "../utils/store";

const initialState = {
  request: initRequestState(),
};

export const signup = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP.SUCCESS:
      return {
        ...state,
        request: setRequestSuccess(state.request, action.data),
      };

    case SIGNUP.LOADING:
      return {
        ...state,
        request: setRequestPending(state.request),
      };

    case SIGNUP.ERROR:
      return {
        ...state,
        request: setRequestError(state.request, action.message),
      };

    case SIGNUP.RESET_STATUS:
      return {
        ...state,
        request: resetRequestStatus(state.request),
      };

    default:
      return state;
  }
};
