import { LOGIN } from "../actions/login";
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

export const login = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN.SUCCESS:
      return {
        ...state,
        request: setRequestSuccess(state.request, action.data),
      };

    case LOGIN.LOADING:
      return {
        ...state,
        request: setRequestPending(state.request),
      };

    case LOGIN.ERROR:
      return {
        ...state,
        request: setRequestError(state.request, action.message),
      };

    case LOGIN.RESET:
      return {
        ...state,
        request: resetRequestStatus(state.request),
      };

    default:
      return state;
  }
};
