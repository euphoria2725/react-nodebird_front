import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";
import Link from "next/link";
import Router from "next/router";
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
import PostCardContent from "./PostCardContent";

import {
  REMOVE_POST_REQUEST,
  LIKE_POST_REQUEST,
  UNLIKE_POST_REQUEST,
  RETWEET_REQUEST,
} from "../reducers/post";

const CardWrapper = styled.div`
  margin-bottom: 20px;
`;

const ButtonWrapper = styled.span`
  display: inline-block;
  margin-left: 4px;
`;

const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.user.me?.id);
  const { removePostLoading } = useSelector((state) => state.post);

  const liked = post.Likers.find((l) => l.id === id);

  const onComment = () => {
    Router.push(`/posts/${post.id}`);
  };

  const onLike = () => {
    if (!id) {
      return alert("로그인이 필요합니다.");
    }
    dispatch({
      type: LIKE_POST_REQUEST,
      data: post.id,
    });
  };

  const onUnlike = () => {
    dispatch({
      type: UNLIKE_POST_REQUEST,
      data: post.id,
    });
  };

  const onRemovePost = () => {
    dispatch({
      type: REMOVE_POST_REQUEST,
      data: post.id,
    });
  };

  const onRetweet = () => {
    dispatch({
      type: RETWEET_REQUEST,
      data: post.id,
    });
  };

  return (
    <CardWrapper key={post.id}>
      <Card
        actions={[
          <div key="message">
            <MessageOutlined onClick={onComment} />
            <ButtonWrapper>{post.Comments.length}</ButtonWrapper>
          </div>,
          <RetweetOutlined key="retweet" onClick={onRetweet} />,
          <div key="heart">
            {liked ? (
              <HeartTwoTone twoToneColor="#eb2f96" onClick={onUnlike} />
            ) : (
              <HeartOutlined key="heart" onClick={onLike} />
            )}
            <ButtonWrapper>{post.Likers.length}</ButtonWrapper>
          </div>,
          <Popover
            key="ellipsis"
            content={
              <Button.Group>
                {id === post.User.id ? (
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
        title={
          post.Retweeter ? (
            <>
              <RetweetOutlined />
              <span style={{ display: "inline-block", marginLeft: "10px" }}>
                {post.Retweeter.nickname} Retweeted
              </span>
            </>
          ) : null
        }
        extra={id && <FollowButton post={post} />}
      >
        <Card.Meta
          avatar={
            <Link href={`/users/${post.User.id}`}>
              <Avatar src={post.User.profile_image_url}></Avatar>
            </Link>
          }
          title={
            <>
              <Link href={`/users/${post.User.id}`}>
                <span
                  style={{
                    color: "black",
                    fontSize: "15px",
                    fontWeight: "600",
                  }}
                >
                  {post.User.nickname}
                </span>
              </Link>
              <span
                style={{
                  display: "inline-block",
                  color: "#798690",
                  fontSize: "15px",
                  fontWeight: "400",
                  marginLeft: "5px",
                  marginRight: "5px",
                }}
              >
                ·
              </span>
              <span
                style={{
                  display: "inline-block",
                  color: "#798690",
                  fontSize: "15px",
                  fontWeight: "400",
                }}
              >
                {post.created_at}
              </span>
            </>
          }
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
    </CardWrapper>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.object,
    content: PropTypes.string,
    createdAt: PropTypes.string,
    Comments: PropTypes.arrayOf(PropTypes.any),
    Images: PropTypes.arrayOf(PropTypes.any),
  }),
};

export default PostCard;
