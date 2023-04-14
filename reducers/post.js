// define action type
// REMOVE_IMAGE
export const REMOVE_IMAGE = "REMOVE_IMAGE";
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
// LIKE_POST
export const LIKE_POST_REQUEST = "LIKE_POST_REQUEST";
export const LIKE_POST_SUCCESS = "LIKE_POST_SUCCESS";
export const LIKE_POST_FAILURE = "LIKE_POST_FAILURE";
// UNLIKE_POST
export const UNLIKE_POST_REQUEST = "UNLIKE_POST_REQUEST";
export const UNLIKE_POST_SUCCESS = "UNLIKE_POST_SUCCESS";
export const UNLIKE_POST_FAILURE = "UNLIKE_POST_FAILURE";
// RETWEET
export const RETWEET_REQUEST = "RETWEET_REQUEST";
export const RETWEET_SUCCESS = "RETWEET_SUCCESS";
export const RETWEET_FAILURE = "RETWEET_FAILURE";
// LOAD_USER_POSTS
export const LOAD_USER_POSTS_REQUEST = "LOAD_USER_POSTS_REQUEST";
export const LOAD_USER_POSTS_SUCCESS = "LOAD_USER_POSTS_SUCCESS";
export const LOAD_USER_POSTS_FAILURE = "LOAD_USER_POSTS_FAILURE";
// LOAD_HASHTAG_POSTS
export const LOAD_HASHTAG_POSTS_REQUEST = "LOAD_HASHTAG_POSTS_REQUEST";
export const LOAD_HASHTAG_POSTS_SUCCESS = "LOAD_HASHTAG_POSTS_SUCCESS";
export const LOAD_HASHTAG_POSTS_FAILURE = "LOAD_HASHTAG_POSTS_FAILURE";
// LOAD_POST
export const LOAD_POST_REQUEST = "LOAD_POST_REQUEST";
export const LOAD_POST_SUCCESS = "LOAD_POST_SUCCESS";
export const LOAD_POST_FAILURE = "LOAD_POST_FAILURE";

// define state
export const initialState = {
  mainPosts: [],
  singlePost: null, // 특정 게시글
  postImagesPaths: [], // 게시글에 사진 업로드할 때 필요함.
  hasMorePosts: true,
  // LOAD_POSTS
  loadPostsLoading: false,
  loadPostsDone: false,
  loadPostsError: null,
  // ADD_POST
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  // REMOVE_POST
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,
  // ADD_COMMENT
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
  // UPLOAD_POST_IMAGES
  uploadPostImagesLoading: false,
  uploadPostImagesDone: false,
  uploadPostImagesError: null,
  // LIKE_POST
  likePostLoading: false,
  likePostDone: false,
  likePostError: null,
  // UNLIKE_POST
  unlikePostLoading: false,
  unlikePostDone: false,
  unlikePostError: null,
  // RETWEET
  retweetLoading: false,
  retweetDone: false,
  retweetError: null,
  // LOAD_USER_POSTS
  loadUserPostsLoading: false,
  loadUserPostsDone: false,
  loadUserPostsError: null,
  // LOAD_HASHTAG_POSTS
  loadHashtagPostsLoading: false,
  loadHashtagPostsDone: false,
  loadHashtagPostsError: null,
  // LOAD_POST
  loadPostLoading: false,
  loadPostDone: false,
  loadPostError: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    // REMOVE_IMAGE
    case REMOVE_IMAGE:
      return {
        ...state,
        postImagesPaths: state.postImagesPaths.filter((v, i) => {
          return i !== action.data;
        }),
      };
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
        mainPosts: [...state.mainPosts, ...action.data],
        hasMorePosts: action.data.length === 5,
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
          return post.id !== action.data.id;
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
        singlePost: {
          ...state.singlePost,
          Comments: [
            {
              id: action.data.id,
              content: action.data.content,
              created_at: action.data.created_at,
              User: action.data.User,
            },
            ...state.singlePost.Comments,
          ],
        },
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
    // LIKE_POST
    case LIKE_POST_REQUEST:
      return {
        ...state,
        likePostLoading: true,
        likePostDone: false,
        likePostError: null,
      };
    case LIKE_POST_SUCCESS:
      if (!state.singlePost) {
        return {
          ...state,
          likePostLoading: false,
          likePostDone: true,
          mainPosts: state.mainPosts.map((p) => {
            return p.id === action.data.post_id
              ? {
                  ...p,
                  Likers: [...p.Likers, { id: action.data.user_id }],
                }
              : p;
          }),
        };
      } else {
        return {
          ...state,
          likePostLoading: false,
          likePostDone: true,
          singlePost: {
            ...state.singlePost,
            Likers: [...state.singlePost.Likers, { id: action.data.user_id }],
          },
        };
      }
    case LIKE_POST_FAILURE:
      return {
        ...state,
        likePostLoading: false,
        likePostError: action.error,
      };
    // UNLIKE_POST
    case UNLIKE_POST_REQUEST:
      return {
        ...state,
        unlikePostLoading: true,
        unlikePostDone: false,
        unlikePostError: null,
      };
    case UNLIKE_POST_SUCCESS:
      if (!state.singlePost) {
        return {
          ...state,
          unlikePostLoading: false,
          unlikePostDone: true,
          mainPosts: state.mainPosts.map((p) => {
            return p.id === action.data.post_id
              ? {
                  ...p,
                  Likers: p.Likers.filter((l) => l.id !== action.data.user_id),
                }
              : p;
          }),
        };
      } else {
        return {
          ...state,
          unlikePostLoading: false,
          unlikePostDone: true,
          singlePost: {
            ...state.singlePost,
            Likers: state.singlePost.Likers.filter(
              (l) => l.id !== action.data.user_id
            ),
          },
        };
      }
    case UNLIKE_POST_FAILURE:
      return {
        ...state,
        likePostLoading: false,
        likePostError: action.error,
      };
    // RETWEET
    case RETWEET_REQUEST:
      return {
        ...state,
        retweetLoading: true,
        retweetDone: false,
        retweetError: null,
      };
    case RETWEET_SUCCESS:
      return {
        ...state,
        retweetLoading: false,
        retweetDone: true,
        mainPosts: [action.data, ...state.mainPosts],
      };
    case RETWEET_FAILURE:
      return {
        ...state,
        retweetLoading: false,
        retweetError: action.error,
      };
    // LOAD_USER_POSTS
    case LOAD_USER_POSTS_REQUEST:
      return {
        ...state,
        loadUserPostsLoading: true,
        loadUserPostsDone: false,
        loadUserPostsError: null,
      };
    case LOAD_USER_POSTS_SUCCESS:
      return {
        ...state,
        loadUserPostsLoading: false,
        loadUserPostsDone: true,
        mainPosts: action.data,
      };
    case LOAD_USER_POSTS_FAILURE:
      return {
        ...state,
        loadUserPostsLoading: false,
        loadUserPostsError: action.error,
      };
    // LOAD_HASHTAG_POSTS
    case LOAD_HASHTAG_POSTS_REQUEST:
      return {
        ...state,
        loadHashtagPostsLoading: true,
        loadHashtagPostsDone: false,
        loadHashtagPostsError: null,
      };
    case LOAD_HASHTAG_POSTS_SUCCESS:
      return {
        ...state,
        loadHashtagPostsLoading: false,
        loadHashtagPostsDone: true,
        mainPosts: action.data,
      };
    case LOAD_HASHTAG_POSTS_FAILURE:
      return {
        ...state,
        loadHashtagPostsLoading: false,
        loadHashtagPostsError: action.error,
      };
    // LOAD_POST
    case LOAD_POST_REQUEST:
      return {
        ...state,
        loadPostLoading: true,
        loadPostDone: false,
        loadPostError: null,
      };
    case LOAD_POST_SUCCESS:
      return {
        ...state,
        loadPostLoading: false,
        loadPostDone: true,
        singlePost: action.data,
      };
    case LOAD_POST_FAILURE:
      return {
        ...state,
        loadPostLoading: false,
        loadPostError: action.error,
      };
    // DEFAULT
    default: {
      return state;
    }
  }
};
