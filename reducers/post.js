// define action type
// LOAD_POSTS
// LOAD_POSTS
export const LOAD_POSTS_REQUEST = "LOAD_POSTS_REQUEST";
export const LOAD_POSTS_SUCCESS = "LOAD_POSTS_SUCCESS";
export const LOAD_POSTS_FAILURE = "LOAD_POSTS_FAILURE";
// ADD_POST
export const ADD_POST_REQUEST = "ADD_POST_REQUEST";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_FAILURE = "ADD_POST_FAILURE";
// REMOVE_POST
export const REMOVE_POST_REQUEST = "REMOVE_POST_REQUEST";
export const REMOVE_POST_SUCCESS = "REMOVE_POST_SUCCESS";
export const REMOVE_POST_FAILURE = "REMOVE_POST_FAILURE";
// ADD_COMMENT
export const ADD_COMMENT_REQUEST = "ADD_COMMENT_REQUEST";
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS";
export const ADD_COMMENT_FAILURE = "ADD_COMMENT_FAILURE";
// UPLOAD_POST_IMAGES
export const UPLOAD_POST_IMAGES_REQUEST = "UPLOAD_POST_IMAGES_REQUEST";
export const UPLOAD_POST_IMAGES_SUCCESS = "UPLOAD_POST_IMAGES_SUCCESS";
export const UPLOAD_POST_IMAGES_FAILURE = "UPLOAD_POST_IMAGES_FAILURE";

// define state
export const initialState = {
  mainPosts: [],
  postImagesPaths: [],
  // load-posts
  loadPostsLoading: false,
  loadPostsDone: false,
  loadPostsError: null,
  // add-post
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  // remove-post
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,
  // add-comment
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
  // UPLOAD_POST_IMAGES
  uploadPostImagesLoading: false,
  uploadPostImagesDone: false,
  uploadPostImagesError: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    // LOAD_POSTS
    case LOAD_POSTS_REQUEST:
      return {
        ...state,
        loadPostsLoading: true,
        loadPostsDone: false,
        loadPostsError: null,
      };
    case LOAD_POSTS_SUCCESS:
      return {
        ...state,
        loadPostsLoading: false,
        loadPostsDone: true,
        mainPosts: [...action.data, ...state.mainPosts],
      };
    case LOAD_POSTS_FAILURE:
      return {
        ...state,
        loadPostsLoading: false,
        loadPostsError: action.error,
      };
    // ADD_POST
    case ADD_POST_REQUEST:
      return {
        ...state,
        addPostLoading: true,
        addPostDone: false,
        addPostError: null,
      };
    case ADD_POST_SUCCESS:
      return {
        ...state,
        addPostLoading: false,
        addPostDone: true,
        mainPosts: [action.data, ...state.mainPosts],
        postImagesPaths: [],
      };
    case ADD_POST_FAILURE:
      return {
        ...state,
        addPostLoading: false,
        addPostError: action.error,
      };
    // REMOVE_POST
    case REMOVE_POST_REQUEST:
      return {
        ...state,
        removePostLoading: true,
        removePostDone: false,
        removePostError: null,
      };
    case REMOVE_POST_SUCCESS:
      return {
        ...state,
        removePostLoading: false,
        removePostDone: true,
        mainPosts: state.mainPosts.filter((post) => {
          return post.id !== action.data;
        }),
      };
    case REMOVE_POST_FAILURE:
      return {
        ...state,
        removePostLoading: false,
        removePostError: action.error,
      };
    // ADD_COMMENT
    case ADD_COMMENT_REQUEST:
      return {
        ...state,
        addCommentLoading: true,
        addCommentDone: false,
        addPostError: null,
      };
    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        addCommentLoading: false,
        addCommentDone: true,
        mainPosts: state.mainPosts.map((post) => {
          return post.id === action.data.PostId
            ? {
                ...post,
                Comments: [
                  {
                    id: action.data.id,
                    content: action.data.content,
                    User: action.data.User,
                  },
                  ...post.Comments,
                ],
              }
            : post;
        }),
      };
    case ADD_COMMENT_FAILURE:
      return {
        ...state,
        addCommentLoading: false,
        addCommentError: action.error,
      };
    // UPLOAD_POST_IMAGES
    case UPLOAD_POST_IMAGES_REQUEST:
      return {
        ...state,
        uploadPostImagesLoading: true,
        uploadPostImagesDone: false,
        uploadPostImagesError: null,
      };
    case UPLOAD_POST_IMAGES_SUCCESS:
      return {
        ...state,
        uploadPostImagesLoading: false,
        uploadPostImagesDone: true,
        postImagesPaths: action.data,
      };
    case UPLOAD_POST_IMAGES_FAILURE:
      return {
        ...state,
        uploadPostImagesLoading: false,
        uploadPostImagesError: action.error,
      };
    // DEFAULT
    default: {
      return state;
    }
  }
};
