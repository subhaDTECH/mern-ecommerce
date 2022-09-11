import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  CLEAR_ERRORS,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,

  //loaduser
  LOADUSER_REQUEST,
  LOADUSER_SUCCESS,
  LOADUSER_FAIL,

  //  logout
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,

  //update password
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  UPDATE_PASSWORD_RESET,

  //forgot passsword
  FROGOT_PASSWORD_REQUEST,
  FROGOT_PASSWORD_SUCCESS,
  FROGOT_PASSWORD_FAIL,

  //reset pasword
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,

  //update user
  USERUPDATE_REQUEST,
  USERUPDATE_SUCCESS,
  USERUPDATE_FAIL,

  //get all user
  ALLUSER_REQUEST,
  ALLUSER_SUCCESS,
  ALLUSER_FAIL,

  //edit user role
  EDITUSER_ROLE_REQUEST,
  EDITUSER_ROLE_SUCCESS,
  EDITUSER_ROLE_FAIL,
} from "../constants/userConstants.js";

export const userReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case LOADUSER_REQUEST:
    case REGISTER_REQUEST:
      return {
        loading: true,
        isAuthentication: false,
        user: {},
      };

    case LOADUSER_SUCCESS:
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthentication: true,
        user: action.payload,
      };

    case LOADUSER_FAIL:
    case LOGIN_FAIL:
    case REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        isAuthentication: false,
        user: null,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    //for logout
    case LOGOUT_REQUEST:
      return {
        ...state,
        loading: true,
        isAuthentication: true,
      };

    case LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthentication: false,
        user: null,
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        loading: false,
        isAuthentication: true,
      };

    //for update password
    case UPDATE_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        isupDate: action.payload,
      };
    case UPDATE_PASSWORD_FAIL:
      return {
        ...state,
        isupDate: null,
        loading: false,
        error: action.payload,
      };
    case UPDATE_PASSWORD_RESET:
      return {
        ...state,
        isupDate: null,
      };

    case USERUPDATE_REQUEST:
      return {
        ...state,
        isupDate: null,
      };

    case USERUPDATE_SUCCESS:
      return {
        ...state,
        isupDate: action.payload,
      };

    case USERUPDATE_FAIL:
      return {
        ...state,
        isupDate: action.payload,
      };

    //get all user

    case ALLUSER_REQUEST:
      return {
        ...state,
        loading:true,
        users: [],
      };

    case ALLUSER_SUCCESS:
      return {
        ...state,
         loading:false,
        users: action.payload,
      };

    case ALLUSER_FAIL:
      return {
        ...state,
        loading:false,
        users: action.payload,
      };

    case EDITUSER_ROLE_REQUEST:
      return {
        ...state,
      };

    case EDITUSER_ROLE_SUCCESS:
      return {
        ...state,
        message:action.payload
      };

      case EDITUSER_ROLE_FAIL:
        return {
          ...state,
          message:action.payload
        };

    default:
      return state;
  }
};

//forgout password reducer

export const forgotReducer = (state = {}, action) => {
  switch (action.type) {
    case FROGOT_PASSWORD_REQUEST:
    case RESET_PASSWORD_REQUEST:
      return {
        loading: true,
        isAuthentication: false,
      };

    case FROGOT_PASSWORD_SUCCESS:
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthentication: false,
        message: action.payload,
      };

    case FROGOT_PASSWORD_FAIL:
    case RESET_PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
        isAuthentication: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
