import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { Card, Avatar, Button } from "antd";
import styled from "styled-components";

import { LOG_OUT_REQUEST } from "../reducers/user";

const NumberWrapper = styled.span`
  display: inline-block;
  margin-right: 3px;
`;

const UserProfile = () => {
  const { me, logOutLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch({
      type: LOG_OUT_REQUEST,
    });
  };

  return (
    <Card
      actions={[
        <div key="twit">
          <Link href={`/users/${me.id}`}>
            <NumberWrapper>{me.Posts.length}</NumberWrapper>
            <span>Tweets</span>
          </Link>
        </div>,
        <div key="following">
          <Link href="/profile">
            <NumberWrapper>{me.Followings.length}</NumberWrapper>
            <span>Following</span>
          </Link>
        </div>,
        <div key="follower">
          <Link href="/profile">
            <NumberWrapper>{me.Followers.length}</NumberWrapper>
            <span>Followers</span>
          </Link>
        </div>,
      ]}
    >
      <Card.Meta
        avatar={
          <Link href="/profile">
            <Avatar src={me.profile_image_url}></Avatar>
          </Link>
        }
        title={
          <Link href="/profile">
            <span style={{ color: "black" }}>{me.nickname}</span>
          </Link>
        }
        description={
          <Button
            danger
            type="primary"
            shape="round"
            onClick={onLogout}
            loading={logOutLoading}
          >
            Log Out
          </Button>
        }
      />
    </Card>
  );
};

export default UserProfile;
