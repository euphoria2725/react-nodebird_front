import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { END } from "redux-saga";
import { useInView } from "react-intersection-observer";
import axios from "axios";
import Head from "next/head";
import styled from "styled-components";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import wrapper from "../store/configureStore";

import AppLayout from "../components/AppLayout";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";

import { LOAD_MY_INFO_REQUEST } from "../reducers/user";
import { LOAD_POSTS_REQUEST } from "../reducers/post";

const loadingIcon = <LoadingOutlined style={{ fontSize: 30 }} spin />;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Home = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { mainPosts, loadPostsLoading, hasMorePosts } = useSelector(
    (state) => state.post
  );
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView && hasMorePosts && !loadPostsLoading) {
      const lastId = mainPosts[mainPosts.length - 1]?.id;
      dispatch({
        type: LOAD_POSTS_REQUEST,
        data: {
          lastId,
        },
      });
    }
  }, [inView, hasMorePosts, loadPostsLoading, mainPosts]);

  return (
    <>
      <Head>
        <title>Home / Twitter</title>
      </Head>
      <AppLayout>
        {me && <PostForm />}
        {mainPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
        <div
          ref={hasMorePosts && !loadPostsLoading ? ref : undefined}
          style={{ height: 10 }}
        />
        {/* 로딩 중일 때, 로딩 이모션 효과 불러오기 */}
        {loadPostsLoading ? (
          <LoadingWrapper>
            <Spin indicator={loadingIcon} />
          </LoadingWrapper>
        ) : null}
      </AppLayout>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, res }) => {
      // 이런 식으로 작성해야지 로그인 공유 문제를 막을 수 있다.
      const cookie = req ? req.headers.cookie : "";
      axios.defaults.headers.Cookie = "";
      if (req && cookie) {
        axios.defaults.headers.Cookie = cookie;
      }
      store.dispatch({
        type: LOAD_MY_INFO_REQUEST,
      });
      store.dispatch({
        type: LOAD_POSTS_REQUEST,
      });
      store.dispatch(END);
      await store.sagaTask.toPromise();
    }
);

export default Home;
