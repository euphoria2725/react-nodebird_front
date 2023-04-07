import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Head from "next/head";
import Router from "next/router";
import { Form, Input, Checkbox, Button } from "antd";

import AppLayout from "../components/AppLayout";
import useInput from "../hooks/useInput";
import {
  SIGN_UP_REQUEST,
  UPLOAD_PROFILE_IMAGE_REQUEST,
} from "../reducers/user";

const Signup = () => {
  const dispatch = useDispatch();
  const { me, signUpDone, signUpError, profileImagePath } = useSelector(
    (state) => state.user
  );

  const profileImageInput = useRef();

  const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [term, setTerm] = useState(false);
  const [termError, setTermError] = useState(false);

  // custom Hook, hooks 폴더 아래 useInput Hook 확인
  const [email, onChangeEmail] = useInput("");
  const [nickname, onChangeNickname] = useInput("");
  const [password, onChangePassword] = useInput("");

  useEffect(() => {
    if (me) {
      alert("로그인했으니 메인페이지로 이동합니다.");
      Router.replace("/");
    }
  }, [me && me.id]);

  useEffect(() => {
    if (signUpDone) {
      alert("회원가입이 완료되었습니다.");
      Router.push("/");
    }
  }, [signUpDone]);

  useEffect(() => {
    if (signUpError) {
      alert(signUpError);
    }
  }, [signUpError]);

  const onClickProflieImageUpload = () => {
    profileImageInput.current.click();
  };

  const onChangeImage = (e) => {
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, (f) => {
      imageFormData.append("image", f);
    });
    dispatch({
      type: UPLOAD_PROFILE_IMAGE_REQUEST,
      data: imageFormData,
    });
  };

  const onChangePasswordCheck = (e) => {
    setPasswordCheck(e.target.value);
    setPasswordError(password !== e.target.value);
  };

  const onChangeTerm = (e) => {
    setTerm(e.target.checked);
    setTermError(false);
  };

  const onSubmit = () => {
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }
    if (!term) {
      return setTermError(true);
    }
    dispatch({
      type: SIGN_UP_REQUEST,
      data: {
        email,
        password,
        nickname,
        profile_image_url: `http://localhost:3000/${profileImagePath.filename}`,
      },
    });
  };

  return (
    <>
      <Head>
        <title>회원가입 | Twitter</title>
      </Head>
      {/*회원가입*/}
      <AppLayout>
        <Form
          encType="multipart/form-data"
          onFinish={onSubmit}
          style={{ padding: 10 }}
        >
          <div>
            <label htmlFor="user-email">이메일</label>
            <br />
            <Input
              name="user-email"
              type="email"
              value={email}
              required
              onChange={onChangeEmail}
            />
          </div>
          <div>
            <label htmlFor="user-nickname">닉네임</label>
            <br />
            <Input
              name="user-nickname"
              value={nickname}
              required
              onChange={onChangeNickname}
            />
          </div>
          <div>
            <label htmlFor="user-password">비밀번호</label>
            <br />
            <Input
              name="user-password"
              type="password"
              value={password}
              required
              onChange={onChangePassword}
            />
          </div>
          <div>
            <label>비밀번호 체크</label>
            <br />
            <Input
              name="user-password-check"
              type="password"
              value={passwordCheck}
              required
              onChange={onChangePasswordCheck}
            />
            {passwordError && (
              <div style={{ color: "red" }}>비밀번호가 일치하지 않습니다.</div>
            )}
          </div>
          <div>
            <Checkbox name="user-term" check={term} onChange={onChangeTerm}>
              회원 가입에 동의합니다.
            </Checkbox>
            {termError && (
              <div style={{ color: "red" }}>약관에 동의하셔야 합니다.</div>
            )}
          </div>
          <div>
            <input
              type="file"
              ref={profileImageInput}
              onChange={onChangeImage}
              hidden
            />
            <Button onClick={onClickProflieImageUpload}>
              Upload Profile Image
            </Button>
          </div>
          {profileImagePath && (
            <div>
              <img
                src={`http://localhost:3000/${profileImagePath.filename}`}
                style={{ width: "200px" }}
              />
            </div>
          )}
          <div style={{ marginTop: 10 }}>
            <Button type="primary" htmlType="submit">
              가입하기
            </Button>
          </div>
        </Form>
      </AppLayout>
    </>
  );
};

export default Signup;
