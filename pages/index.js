import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { useInView } from "react-intersection-observer";

import AppLayout from "../components/AppLayout";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";

import { LOAD_USER_REQUEST } from "../reducers/user";
import { LOAD_POSTS_REQUEST } from "../reducers/post";

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
    // 사용자 정보 요청
    dispatch({ type: LOAD_USER_REQUEST });

    // 게시글 불러오기
    dispatch({ type: LOAD_POSTS_REQUEST });
  }, []);

  useEffect(() => {
    // onScroll 정의
    function onScroll() {
      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (hasMorePosts && !loadPostsLoading) {
          const lastId = mainPosts[mainPosts.length - 1]?.id;
          dispatch({
            type: LOAD_POSTS_REQUEST,
            data: {
              lastId,
            },
          });
        }
      }
    }

    // onScroll 사용
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [hasMorePosts, loadPostsLoading, mainPosts]);

  // useEffect(() => {
  //   if (inView && hasMorePosts && !loadPostsLoading) {
  //     const lastId = mainPosts[mainPosts.length - 1]?.id;
  //     dispatch({
  //       type: LOAD_POSTS_REQUEST,
  //       data: {
  //         lastId,
  //       },
  //     });
  //   }
  // }, [inView, hasMorePosts, loadPostsLoading, mainPosts]);

  return (
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
          <LoadingOutlined
            style={{
              fontSize: 30,
            }}
            spin
          />
        </LoadingWrapper>
      ) : null}
    </AppLayout>
  );
};

export default Home;
