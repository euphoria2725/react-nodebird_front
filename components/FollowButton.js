import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { Button } from "antd";

import { FOLLOW_REQUEST, UNFOLLOW_REQUEST } from "../reducers/user";

const FollowButton = ({ post }) => {
  const dispatch = useDispatch();
  const { me, followLoading, unfollowLoading } = useSelector(
    (state) => state.user
  );

  const isFollowing = me?.Followings.find((v) => v.id === post.User.id);

  const onClickIsFollowing = () => {
    if (isFollowing) {
      dispatch({
        type: UNFOLLOW_REQUEST,
        data: post.User.id,
      });
    } else {
      dispatch({
        type: FOLLOW_REQUEST,
        data: post.User.id,
      });
    }
  };

  // post.User.id: 게시글 작성자의 id
  if (me.id === post.User.id) {
    return null;
  }
  return (
    <Button
      onClick={onClickIsFollowing}
      loading={followLoading || unfollowLoading}
      danger={isFollowing}
      type="primary"
      shape="round"
    >
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
};

FollowButton.propTypes = {
  post: PropTypes.object.isRequired,
};

export default FollowButton;
