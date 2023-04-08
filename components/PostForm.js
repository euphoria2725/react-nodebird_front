import React, { useState, useRef, useCallback, useEffect } from "react";
import { Form, Input, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";

import {
  ADD_POST_REQUEST,
  UPLOAD_POST_IMAGES_REQUEST,
  REMOVE_IMAGE,
} from "../reducers/post";

const PostForm = () => {
  const dispatch = useDispatch();
  const { postImagesPaths, addPostLoading, addPostDone } = useSelector(
    (state) => state.post
  );
  const { me } = useSelector((state) => state.user);

  const imageInput = useRef();

  const [text, setText] = useState("");

  useEffect(() => {
    if (addPostDone) {
      setText("");
    }
  }, [addPostDone]);

  const onChangeText = (e) => {
    setText(e.target.value);
  };

  const onClickImageUpload = () => {
    imageInput.current.click();
  };

  const onChangeImages = (e) => {
    console.log("images", e.target.images);
    const formData = new FormData();
    [].forEach.call(e.target.files, (f) => {
      formData.append("image", f);
    });
    dispatch({
      type: UPLOAD_POST_IMAGES_REQUEST,
      data: formData,
    });
  };

  const onRemoveImage = (idx) => {
    dispatch({
      type: REMOVE_IMAGE,
      data: idx,
    });
  };

  const onSubmit = () => {
    if (!text) {
      return alert("게시글을 작성하세요!");
    }
    const formData = new FormData();
    // 이미지 경로를 업로드
    postImagesPaths.forEach((p) => {
      formData.append("image", p);
    });
    formData.append("content", text);
    dispatch({
      type: ADD_POST_REQUEST,
      data: formData,
    });
  };

  return (
    <Form
      encType="multipart/form-data" // 어차피 dispatch할 것인데, 여기서 form의 encType을 지정할 필요가 있나?
      onFinish={onSubmit}
      style={{ margin: "10px 0 20px" }}
    >
      <Input.TextArea
        value={text}
        onChange={onChangeText}
        maxLength={280}
        placeholder="What's happening?"
        style={{ height: "100px" }}
      />
      <div style={{ marginTop: "3px" }}>
        <input
          type="file"
          multiple
          ref={imageInput}
          onChange={onChangeImages}
          hidden
        />
        <Button onClick={onClickImageUpload}>이미지 업로드</Button>
        <Button
          type="primary"
          htmlType="submit"
          shape="round"
          loading={addPostLoading}
          style={{ float: "right" }}
        >
          Tweet
        </Button>
      </div>
      {/*업로드한 이미지 미리 보기*/}
      {postImagesPaths.map((v, idx) => {
        return (
          <div key={v} style={{ display: "inline-block" }}>
            <img
              src={"http://localhost:3000/" + v}
              alt={v}
              style={{ width: "200px" }}
            />
            <div>
              <Button
                onClick={() => {
                  onRemoveImage(idx);
                }}
              >
                제거
              </Button>
            </div>
          </div>
        );
      })}
    </Form>
  );
};

export default PostForm;
