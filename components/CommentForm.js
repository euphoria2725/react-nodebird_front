import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Form, Button, Input } from "antd";
import styled from "styled-components";

import { ADD_COMMENT_REQUEST } from "../reducers/post";

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const CommentForm = ({ post }) => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { addCommentDone } = useSelector((state) => state.post);

  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    if (addCommentDone) {
      setCommentText("");
    }
  }, [addCommentDone]);

  const onChangeCommentText = (e) => {
    setCommentText(e.target.value);
  };

  const onSubmitComment = () => {
    dispatch({
      type: ADD_COMMENT_REQUEST,
      data: {
        postId: post.id,
        content: commentText,
        User: {
          id: me.id,
          nickname: me.nickname,
          profileImageUrl: me.profileImageUrl,
        },
      },
    });
  };

  return (
    <Form onFinish={onSubmitComment}>
      <Form.Item>
        <Input.TextArea
          value={commentText}
          onChange={onChangeCommentText}
          placeholder="Tweet your reply"
        />
        <ButtonWrapper>
          <Button htmlType="submit" type="primary" shape="round">
            Reply
          </Button>
        </ButtonWrapper>
      </Form.Item>
    </Form>
  );
};

CommentForm.propTypes = {
  post: PropTypes.object.isRequired,
};

export default CommentForm;
