import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import { END } from "redux-saga";
import axios from "axios";

import wrapper from "../../store/configureStore";

import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import { LOAD_HASHTAG_POSTS_REQUEST } from "../../reducers/post";

import AppLayout from "../../components/AppLayout";
import PostCard from "../../components/PostCard";

const Users = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { tag } = router.query;
  const { mainPosts } = useSelector((state) => state.post);

  return (
    <>
      <Head>
        <title>#{tag}/ Twitter</title>
      </Head>
      <AppLayout>
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
        type: LOAD_HASHTAG_POSTS_REQUEST,
        data: {
          tag: params.tag,
        },
      });
      store.dispatch(END);
      await store.sagaTask.toPromise();
    }
);

export default Users;
