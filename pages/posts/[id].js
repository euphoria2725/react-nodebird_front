import React from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { END } from "redux-saga";
import { useDispatch, useSelector } from "react-redux";
import Head from "next/head";
import moment from "moment";
import { Avatar, Comment, List } from "antd";

import wrapper from "../../store/configureStore";

import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import { LOAD_POST_REQUEST } from "../../reducers/post";
import PostCard from "../../components/PostCard";

import AppLayout from "../../components/AppLayout";
import CommentForm from "../../components/CommentForm";

const Posts = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { id } = router.query;
  const { me } = useSelector((state) => state.user);
  const { singlePost } = useSelector((state) => state.post);

  if (!singlePost) {
    return null; // 뒤로 가기 눌렀을 때, 에러가 난다..
  }
  return (
    <>
      <Head>
        <title>{singlePost.content.substr(0, 15)} / Twitter</title>
      </Head>
      <AppLayout>
        <PostCard post={singlePost} />
        {me ? <CommentForm post={singlePost} /> : null}
        <List
          header={`${singlePost.Comments.length}개의 댓글`}
          itemLayout="horizontal"
          dataSource={singlePost.Comments}
          renderItem={(item) => (
            <li>
              <Comment
                author={item.User.nickname}
                avatar={<Avatar src={item.User.profile_image_url}></Avatar>}
                content={item.content}
                datetime={item.created_at}
              />
            </li>
          )}
        />
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
        type: LOAD_POST_REQUEST,
        data: {
          postId: params.id,
        },
      });
      store.dispatch(END);
      await store.sagaTask.toPromise();
    }
);

export default Posts;
