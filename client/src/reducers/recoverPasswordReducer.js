import ACTION from '../actions/actionTypes';

const initialState = {
  isFetching: false,
  error: null,
  isDone: false,
};

const recoverPasswordReducer = function (state = initialState, action) {
  switch (action.type) {
    case action.PASSWORD_RECOVER_ACTION_REQUEST: {
      return {
        isFetching: true,
        error: null,
        isDone: false,
      };
    }
    case ACTION.PASSWORD_RECOVER_ACTION_SUCCESS: {
      return {
        isFetching: false,
        error: null,
        isDone: true,
      };
    }
    case ACTION.PASSWORD_RECOVER_ACTION_ERROR: {
      return {
        isFetching: false,
        error: action.error,
        isDone: false
      };
    }
    case ACTION.PASSWORD_RECOVER_ACTION_CLEAR_ERROR: {
      return {
        ...state,
        error: null,
      };
    }
    case ACTION.PASSWORD_RECOVER_ACTION_CLEAR: {
      return initialState;
    }
    default:
      return state;
  }
}

export default recoverPasswordReducer;
