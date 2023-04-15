import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { Form, Input, Button } from "antd";

import { LOG_IN_REQUEST } from "../reducers/user";

const LoginForm = () => {
  const dispatch = useDispatch();
  const { logInLoading, logInError } = useSelector((state) => state.user);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (logInError) {
      alert(logInError);
    }
  }, [logInError]);

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onSubmitForm = () => {
    dispatch({
      type: LOG_IN_REQUEST,
      data: {
        email,
        password,
      },
    });
  };

  return (
    <Form onFinish={onSubmitForm} style={{ padding: "10px" }}>
      <div>
        <label htmlFor="user-email">Email</label>
        <br />
        <Input
          name="user-email"
          type="email"
          value={email}
          onChange={onChangeEmail}
        />
      </div>
      <div>
        <label htmlFor="user-password">Password</label>
        <br />
        <Input
          name="user-password"
          type="password"
          value={password}
          onChange={onChangePassword}
        />
      </div>
      <div style={{ marginTop: 10 }}>
        <Button
          htmlType="submit"
          loading={logInLoading}
          type="primary"
          shape="round"
        >
          Log In
        </Button>
        <Link href="/signup">
          <Button shape="round">Sign Up</Button>
        </Link>
      </div>
    </Form>
  );
};

export default LoginForm;
