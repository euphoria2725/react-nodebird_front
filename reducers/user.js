// define action type
// LOG_IN
// LOG_IN
export const LOG_IN_REQUEST = "LOG_IN_REQUEST";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILURE = "LOG_IN_FAILURE";
// LOG_OUT
export const LOG_OUT_REQUEST = "LOG_OUT_REQUEST";
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";
export const LOG_OUT_FAILURE = "LOG_OUT_FAILURE";
// SIGN_UP
export const SIGN_UP_REQUEST = "SIGN_UP_REQUEST";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE";
// ADD_POST_TO_ME
export const ADD_POST_TO_ME = "ADD_POST_TO_ME";
export const REMOVE_POST_OF_ME = "REMOVE_POST_OF_ME";
// LOAD_USER
export const LOAD_USER_REQUEST = "LOAD_USER_REQUEST";
export const LOAD_USER_SUCCESS = "LOAD_USER_SUCCESS";
export const LOAD_USER_FAILURE = "LOAD_USER_FAILURE";
// UPLOAD_PROFILE_IMAGE
export const UPLOAD_PROFILE_IMAGE_REQUEST = "UPLOAD_PROFILE_IMAGE_REQUEST";
export const UPLOAD_PROFILE_IMAGE_SUCCESS = "UPLOAD_PROFILE_IMAGE_SUCCESS";
export const UPLOAD_PROFILE_IMAGE_FAILURE = "UPLOAD_PROFILE_IMAGE_FAILURE";

export const loginRequestAction = (data) => {
  return {
    type: LOG_IN_REQUEST,
    data,
  };
};

export const logoutRequestAction = () => {
  return {
    type: LOG_OUT_REQUEST,
  };
};

// define state
export const initialState = {
  me: null,
  signUpData: {},
  loginData: {},
  profileImageUrl: null,
  // LOG_IN
  logInLoading: false,
  logInDone: false,
  logInError: null,
  // LOG_OUT
  logOutLoading: false,
  logOutDone: false,
  logOUtError: null,
  // SIGN_UP
  signUpLoading: false,
  signUpDone: false,
  signUpError: null,
  // LOAD_USER
  loadUserLoading: false,
  loadUserDone: false,
  loadUserError: null,
  // UPLOAD_PROFILE_IMAGE
  uploadProfileImageLoading: false,
  uploadProfileImageDone: false,
  uploadProfileImageError: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    // LOG_IN
    case LOG_IN_REQUEST:
      return {
        ...state,
        logInLoading: true,
        logInDone: false,
        logInError: null,
      };
    case LOG_IN_SUCCESS:
      return {
        ...state,
        logInLoading: false,
        logInDone: true,
        me: action.data,
      };
    case LOG_IN_FAILURE:
      return {
        ...state,
        logInLoading: false,
        logInError: action.error,
      };
    // LOG_OUT
    case LOG_OUT_REQUEST:
      return {
        ...state,
        logOutLoading: true,
        logOutDone: false,
        logOUtError: null,
      };
    case LOG_OUT_SUCCESS:
      return {
        ...state,
        logOutLoading: false,
        logOutDone: true,
        me: null,
      };
    case LOG_OUT_FAILURE:
      return {
        ...state,
        logOutLoading: false,
        logOUtError: action.error,
      };
    // SIGN_UP
    case SIGN_UP_REQUEST:
      return {
        ...state,
        signUpLoading: true,
        signUpDone: false,
        signUpError: null,
      };
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        signUpLoading: false,
        signUpDone: true,
      };
    case SIGN_UP_FAILURE:
      return {
        ...state,
        signUpLoading: false,
        signUpError: action.error,
      };
    // ADD_POST_TO_ME
    case ADD_POST_TO_ME:
      return {
        ...state,
        me: {
          ...state.me,
          Posts: [action.data, ...state.me.Posts],
        },
      };
    // REMOVE_POST_OF_ME
    case REMOVE_POST_OF_ME:
      return {
        ...state,
        me: {
          ...state.me,
          Posts: state.me.Posts.filter((post) => {
            return post.id !== action.data;
          }),
        },
      };
    // LOAD_USER
    case LOAD_USER_REQUEST:
      return {
        ...state,
        loadUserLoading: true,
        loadUserDone: false,
        loadUserError: null,
      };
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        loadUserLoading: false,
        loadUserDone: true,
        me: action.data,
      };
    case LOAD_USER_FAILURE:
      return {
        ...state,
        loadUserLoading: false,
        loadUserError: action.error,
      };
    // UPLOAD_PROFILE_IMAGE
    case UPLOAD_PROFILE_IMAGE_REQUEST:
      return {
        ...state,
        uploadProfileImageLoading: true,
        uploadProfileImageDone: false,
        uploadProfileImageError: null,
      };
    case UPLOAD_PROFILE_IMAGE_SUCCESS:
      return {
        ...state,
        uploadProfileImageLoading: false,
        uploadProfileImageDone: true,
        profileImageUrl: action.data,
      };
    case UPLOAD_PROFILE_IMAGE_FAILURE:
      return {
        ...state,
        uploadProfileImageLoading: false,
        uploadProfileImageError: action.error,
      };
    default:
      return state;
  }
};
