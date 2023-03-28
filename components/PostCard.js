import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Card, Popover, Avatar, Button, List, Comment } from "antd";
import {
  RetweetOutlined,
  HeartOutlined,
  HeartTwoTone,
  MessageOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";

import PostImages from "./PostImages";
import FollowButton from "./FollowButton";
import CommentForm from "./CommentForm";
import PostCardContent from "./PostCardContent";

import { REMOVE_POST_REQUEST } from "../reducers/post";

const CardWrapper = styled.div`
  margin-bottom: 20px;
`;

const ButtonWrapper = styled.span`
  display: inline-block;
  margin-left: 4px;
`;

const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { removePostLoading } = useSelector((state) => state.post);

  const [liked, setLiked] = useState(false);
  const [commentFormOpened, setCommentFormOpened] = useState(false);

  const onToggleLike = () => {
    setLiked((prev) => !prev);
  };

  const onToggleComment = () => {
    setCommentFormOpened((prev) => !prev);
  };

  const onRemovePost = () => {
    dispatch({
      type: REMOVE_POST_REQUEST,
      data: post.id,
    });
  };

  return (
    <CardWrapper key={post.id}>
      <Card
        actions={[
          <RetweetOutlined key="retweet" />,
          liked ? (
            <HeartTwoTone
              key="heart"
              twoToneColor="#eb2f96"
              onClick={onToggleLike}
            />
          ) : (
            <HeartOutlined key="heart" onClick={onToggleLike} />
          ),
          <div key="message">
            <MessageOutlined onClick={onToggleComment} />
            <ButtonWrapper>{post.Comments.length}</ButtonWrapper>
          </div>,
          <Popover
            key="ellipsis"
            content={
              <Button.Group>
                {me && me.id === post.User.id ? (
                  <>
                    <Button>수정</Button>
                    <Button
                      onClick={onRemovePost}
                      type="danger"
                      loading={removePostLoading}
                    >
                      삭제
                    </Button>
                  </>
                ) : (
                  <Button>신고</Button>
                )}
              </Button.Group>
            }
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
        extra={me && <FollowButton post={post} />}
      >
        <Card.Meta
          avatar={<Avatar src={post.User.profileImageUrl}></Avatar>}
          title={post.User.nickname}
          description={
            <>
              <div style={{ marginBottom: 15 }}>
                {<PostCardContent content={post.content} />}
              </div>
              {post.Images[0] && <PostImages images={post.Images} />}
            </>
          }
        />
      </Card>
      {commentFormOpened && (
        <>
          <CommentForm post={post} />
          <List
            header={`${post.Comments.length}개의 댓글`}
            itemLayout="horizontal"
            dataSource={post.Comments}
            renderItem={(item) => (
              <li>
                <Comment
                  author={item.User.nickname}
                  avatar={<Avatar src={item.User.profileImageUrl}></Avatar>}
                  content={item.content}
                />
              </li>
            )}
          />
        </>
      )}
    </CardWrapper>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string,
    User: PropTypes.object,
    content: PropTypes.string,
    createdAt: PropTypes.object,
    Comments: PropTypes.arrayOf(PropTypes.any),
    Images: PropTypes.arrayOf(PropTypes.any),
  }),
};

export default PostCard;
