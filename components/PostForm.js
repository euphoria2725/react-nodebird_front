import React, { useState, useRef, useCallback, useEffect } from "react";
import { Form, Input, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { ADD_POST_REQUEST } from "../reducers/post";

const PostForm = () => {
  const dispatch = useDispatch();
  const { imagePaths, addPostLoading, addPostDone } = useSelector(
    (state) => state.post
  );
  const { me } = useSelector((state) => state.user);

  const imageInput = useRef();

  const [text, setText] = useState("");

  useEffect(() => {
    if (addPostDone) {
      setText(""); // delay를 주니까 되는 것 같기도 하고..
    }
  }, [addPostDone]);

  const onChangeText = (e) => {
    setText(e.target.value);
  };

  const onClickImageUpload = () => {
    imageInput.current.click();
  };

  const onSubmit = () => {
    dispatch({
      type: ADD_POST_REQUEST,
      data: {
        text,
      },
    });
  };

  return (
    <Form
      encType="multipart/form-data"
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
        <input type="file" multiple ref={imageInput} hidden />
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
      {/*업로드할 이미지 미리 보기*/}
      {imagePaths.map((v) => {
        return (
          <div key={v} style={{ display: "inline-block" }}>
            <img
              src={"http://localhost:3065/" + v}
              alt={v}
              style={{ width: "200px" }}
            />
            <div>
              <Button>제거</Button>
            </div>
          </div>
        );
      })}
    </Form>
  );
};

export default PostForm;
