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
// FOLLOW
export const FOLLOW_REQUEST = "FOLLOW_REQUEST";
export const FOLLOW_SUCCESS = "FOLLOW_SUCCESS";
export const FOLLOW_FAILURE = "FOLLOW_FAILURE";
// UNFOLLOW
export const UNFOLLOW_REQUEST = "UNFOLLOW_REQUEST";
export const UNFOLLOW_SUCCESS = "UNFOLLOW_SUCCESS";
export const UNFOLLOW_FAILURE = "UNFOLLOW_FAILURE";
// REMOVE_FOLLOWER
export const REMOVE_FOLLOWER_REQUEST = "REMOVE_FOLLOWER_REQUEST";
export const REMOVE_FOLLOWER_SUCCESS = "REMOVE_FOLLOWER_SUCCESS";
export const REMOVE_FOLLOWER_FAILURE = "REMOVE_FOLLOWER_FAILURE";
// CHANGE_NICKNAME
export const CHANGE_NICKNAME_REQUEST = "CHANGE_NICKNAME_REQUEST";
export const CHANGE_NICKNAME_SUCCESS = "CHANGE_NICKNAME_SUCCESS";
export const CHANGE_NICKNAME_FAILURE = "CHANGE_NICKNAME_FAILURE";

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
  profileImagePath: null, // 사용자가 회원가입 시 프로필 이미지 업로드할 때 필요함
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
  // FOLLOW
  followLoading: false,
  followDone: false,
  followError: null,
  // UNFOLLOW
  unfollowLoading: false,
  unfollowDone: false,
  unfollowError: null,
  // REMOVE_FOLLOWER
  removeFollowerLoading: false,
  removeFollowerDone: false,
  removeFollowerError: null,
  // CHANGE_NICKNAME
  changeNicknameLoading: false,
  changeNicknameDone: false,
  changeNicknameError: null,
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
        signUpDone: false,
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
            return post.id !== action.data.id;
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
        profileImagePath: action.data,
      };
    case UPLOAD_PROFILE_IMAGE_FAILURE:
      return {
        ...state,
        uploadProfileImageLoading: false,
        uploadProfileImageError: action.error,
      };
    // FOLLOW
    case FOLLOW_REQUEST:
      return {
        ...state,
        followLoading: true,
        followDone: false,
        followError: null,
      };
    case FOLLOW_SUCCESS:
      return {
        ...state,
        followLoading: false,
        followDone: true,
        me: {
          ...state.me,
          Followings: [...state.me.Followings, action.data],
        },
      };
    case FOLLOW_FAILURE:
      return {
        ...state,
        followLoading: false,
        followError: action.error,
      };
    // UNFOLLOW
    case UNFOLLOW_REQUEST:
      return {
        ...state,
        unfollowLoading: true,
        unfollowDone: false,
        unfollowError: null,
      };
    case UNFOLLOW_SUCCESS:
      return {
        ...state,
        unfollowLoading: false,
        unfollowDone: true,
        me: {
          ...state.me,
          Followings: state.me.Followings.filter(
            (f) => f.id !== action.data.id
          ),
        },
      };
    case UNFOLLOW_FAILURE:
      return {
        ...state,
        unfollowLoading: false,
        unfollowError: action.error,
      };
    // REMOVE_FOLLOWER
    case REMOVE_FOLLOWER_REQUEST:
      return {
        ...state,
        removeFollowerLoading: true,
        removeFollowerDone: false,
        removeFollowerError: null,
      };
    case REMOVE_FOLLOWER_SUCCESS:
      return {
        ...state,
        removeFollowerLoading: false,
        removeFollowerDone: true,
        me: {
          ...state.me,
          Followers: state.me.Followers.filter((f) => f.id !== action.data.id),
        },
      };
    case REMOVE_FOLLOWER_FAILURE:
      return {
        ...state,
        removeFollowerLoading: false,
        removeFollowerError: action.error,
      };
    // CHANGE_NICKNAME
    case CHANGE_NICKNAME_REQUEST:
      return {
        ...state,
        changeNicknameLoading: true,
        changeNicknameDone: false,
        changeNicknameError: null,
      };
    case CHANGE_NICKNAME_SUCCESS:
      return {
        ...state,
        changeNicknameLoading: false,
        changeNicknameDone: true,
        me: {
          ...state.me,
          nickname: action.data.nickname,
        },
      };
    case CHANGE_NICKNAME_FAILURE:
      return {
        ...state,
        changeNicknameLoading: false,
        changeNicknameError: action.error,
      };
    // DEFAULT
    default:
      return state;
  }
};
