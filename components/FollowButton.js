import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { Button } from "antd";

const FollowButton = ({ post }) => {
  const { me } = useSelector((state) => state.user);
  const [isFollowing, setIsFollowing] = useState(false);

  const onClickIsFollowing = () => {
    setIsFollowing((prev) => !prev);
  };

  if (me.id === post.User.id) {
    return null;
  }
  return (
    <Button
      onClick={onClickIsFollowing}
      type="primary"
      shape="round"
      danger={isFollowing}
    >
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
};

FollowButton.propTypes = {
  post: PropTypes.object.isRequired,
};

export default FollowButton;
