import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input } from "antd";

import { CHANGE_NICKNAME_REQUEST } from "../reducers/user";

const NicknameEditForm = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const [nickname, setNickname] = useState(me?.nickname || "");

  const onChangeNickname = (e) => {
    setNickname(e.target.value);
  };

  const onSubmit = () => {
    dispatch({
      type: CHANGE_NICKNAME_REQUEST,
      data: {
        userId: me.id,
        nickname,
      },
    });
  };

  return (
    <Form
      style={{
        marginBottom: "20px",
        border: "1px solid #d9d9d9",
        padding: "20px",
      }}
    >
      <Input.Search
        value={nickname}
        onChange={onChangeNickname}
        addonBefore="Nickname"
        enterButton="수정"
        onSearch={onSubmit}
      />
    </Form>
  );
};

export default NicknameEditForm;
