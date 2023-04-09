import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Router from "next/router";
import Head from "next/head";
import axios from "axios";
import { END } from "redux-saga";

import wrapper from "../store/configureStore";

import AppLayout from "../components/AppLayout";
import NicknameEditForm from "../components/NicknameEditForm";
import FollowList from "../components/FollowList";

import { LOAD_MY_INFO_REQUEST } from "../reducers/user";

const Profile = () => {
  const { me } = useSelector((state) => state.user);

  useEffect(() => {
    if (!(me && me.id)) {
      Router.push("/");
    }
  }, [me && me.id]);

  if (!me) {
    return null;
  }
  return (
    <>
      <Head>
        <title>내 프로필 | NodeBird</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList header="Following" data={me.Followings} />
        <FollowList header="Followers" data={me.Followers} />
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
      store.dispatch(END);
      await store.sagaTask.toPromise();
    }
);

export default Profile;
