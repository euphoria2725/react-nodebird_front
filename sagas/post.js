import { all, fork, put, takeLatest, delay, call } from "redux-saga/effects";
import axios from "axios";

import {
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_SUCCESS,
  LOAD_POSTS_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
  REMOVE_POST_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  UPLOAD_POST_IMAGES_REQUEST,
  UPLOAD_POST_IMAGES_SUCCESS,
  UPLOAD_POST_IMAGES_FAILURE,
} from "../reducers/post";
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from "../reducers/user";

// LOAD_POST
function loadPostsAPI() {
  return axios.get("/posts");
}

function* loadPosts() {
  try {
    const result = yield call(loadPostsAPI);
    yield put({
      type: LOAD_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_POSTS_FAILURE,
      error: err.response.data,
    });
  }
}

// ADD_POST
function addPostAPI(data) {
  return axios.post("/posts", data);
}

function* addPost(action) {
  try {
    const result = yield call(addPostAPI, action.data);
    //
    yield put({
      type: ADD_POST_SUCCESS,
      data: result.data,
    });
    //
    yield put({
      type: ADD_POST_TO_ME,
      data: { id: result.data.id },
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_POST_FAILURE,
      error: err.response.data,
    });
  }
}

// REMOVE_POST
function* removePost(action) {
  try {
    //
    yield delay(1000);
    yield put({
      type: REMOVE_POST_SUCCESS,
      data: action.data,
    });
    //
    yield put({
      type: REMOVE_POST_OF_ME,
      data: action.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: REMOVE_POST_FAILURE,
      error: err.response.data,
    });
  }
}

// ADD_COMMENT
function addCommentAPI(data) {
  return axios.post(`/posts/${data.postId}/comment`, data);
}

function* addComment(action) {
  try {
    const result = yield call(addCommentAPI, action.data);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_COMMENT_FAILURE,
      error: err.response.data,
    });
  }
}

function uploadPostImagesAPI(data) {
  return axios.post("/posts/images", data);
}

// UPLOAD_POST_IMAGES
function* uploadPostImages(action) {
  try {
    const result = yield call(uploadPostImagesAPI, action.data);
    yield put({
      type: UPLOAD_POST_IMAGES_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: UPLOAD_POST_IMAGES_FAILURE,
      error: error.response.data,
    });
  }
}

function* watchLoadPosts() {
  yield takeLatest(LOAD_POSTS_REQUEST, loadPosts);
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

function* watchUploadPostImages() {
  yield takeLatest(UPLOAD_POST_IMAGES_REQUEST, uploadPostImages);
}

export default function* postSaga() {
  yield all([
    fork(watchLoadPosts),
    fork(watchAddPost),
    fork(watchRemovePost),
    fork(watchAddComment),
    fork(watchUploadPostImages),
  ]);
}
