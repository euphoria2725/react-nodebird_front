import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import { END } from "redux-saga";
import axios from "axios";
import { Menu, Card, Avatar } from "antd";
import styled from "styled-components";

import wrapper from "../../store/configureStore";

import { LOAD_MY_INFO_REQUEST, LOAD_USER_REQUEST } from "../../reducers/user";
import { LOAD_USER_POSTS_REQUEST } from "../../reducers/post";

import AppLayout from "../../components/AppLayout";
import PostCard from "../../components/PostCard";

const NumberWrapper = styled.span`
  display: inline-block;
  margin-right: 3px;
`;

const Users = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { id } = router.query;
  const { userInfo } = useSelector((state) => state.user);
  const { mainPosts } = useSelector((state) => state.post);

  return (
    <>
      <Head>
        <title>{userInfo.nickname} / Twitter</title>
      </Head>
      <AppLayout>
        <Card
          actions={[
            <div key="twit">
              <NumberWrapper>{userInfo.Posts.length}</NumberWrapper>
              <span>Tweets</span>
            </div>,
            <div key="following">
              <NumberWrapper>{userInfo.Followings.length}</NumberWrapper>
              <span>Following</span>
            </div>,
            <div key="follower">
              <NumberWrapper>{userInfo.Followers.length}</NumberWrapper>
              <span>Followers</span>
            </div>,
          ]}
        >
          <Card.Meta
            avatar={<Avatar src={userInfo.profile_image_url}></Avatar>}
            title={userInfo.nickname}
          />
        </Card>
        <Menu mode="horizontal" defaultSelectedKeys={["Tweets"]}>
          <Menu.Item key="Tweets">Tweets</Menu.Item>
          <Menu.Item key="Replies">Replies</Menu.Item>
          <Menu.Item key="Media">Media</Menu.Item>
          <Menu.Item key="Likes">Likes</Menu.Item>
        </Menu>
        {mainPosts.map((c) => {
          return <PostCard key={c.id} post={c} />;
        })}
      </AppLayout>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, res, params }) => {
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
        type: LOAD_USER_REQUEST,
        data: {
          userId: params.id,
        },
      });
      store.dispatch({
        type: LOAD_USER_POSTS_REQUEST,
        data: {
          userId: params.id,
        },
      });
      store.dispatch(END);
      await store.sagaTask.toPromise();
    }
);

export default Users;
