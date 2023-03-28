import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Avatar, Button } from "antd";
import styled from "styled-components";

import { logoutRequestAction } from "../reducers/user";

const NumberWrapper = styled.span`
  display: inline-block;
  margin-right: 3px;
`;

const UserProfile = () => {
  const { me, logOutLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const onLogout = useCallback(() => {
    dispatch(logoutRequestAction());
  }, []);

  return (
    <Card
      actions={[
        <div key="twit">
          <NumberWrapper>{me.Posts.length}</NumberWrapper>
          <span>Tweets</span>
        </div>,
        <div key="following">
          <NumberWrapper>{me.Followings.length}</NumberWrapper>
          <span>Following</span>
        </div>,
        <div key="follower">
          <NumberWrapper>{me.Followers.length}</NumberWrapper>
          <span>Followers</span>
        </div>,
      ]}
    >
      <Card.Meta
        avatar={<Avatar src={me.profileImageUrl}></Avatar>}
        title={me.nickname}
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
