import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import styled from "styled-components";

import AppLayout from "../components/AppLayout";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";

import { LOAD_USER_REQUEST } from "../reducers/user";
import { LOAD_POSTS_REQUEST } from "../reducers/post";

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 30,
    }}
    spin
  />
);

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Home = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { mainPosts, loadPostsLoading } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch({ type: LOAD_USER_REQUEST });
    dispatch({ type: LOAD_POSTS_REQUEST });
  }, []);

  return (
    <AppLayout>
      {me && <PostForm />}
      {loadPostsLoading ? (
        <LoadingWrapper>
          <Spin indicator={antIcon} />
        </LoadingWrapper>
      ) : (
        mainPosts.map((post) => {
          return <PostCard key={post.id} post={post} />;
        })
      )}
    </AppLayout>
  );
};

export default Home;
