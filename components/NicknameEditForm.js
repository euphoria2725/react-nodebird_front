import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Form, Input } from "antd";

const NicknameEditForm = () => {
  const { me } = useSelector((state) => state.user);
  const [nickname, setNickname] = useState(me?.nickname || "");

  const onChangeNickname = (e) => {
    setNickname(e.target.value);
  };

  const onSubmit = () => {};

  return (
    <Form
      onFinish={onSubmit}
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
      />
    </Form>
  );
};

export default NicknameEditForm;
