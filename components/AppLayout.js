import React, { useState } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import Router from "next/router";
import { useSelector } from "react-redux";
import { Menu, Row, Col, Input } from "antd";
import {
  HomeOutlined,
  TwitterOutlined,
  UserOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import styled from "styled-components";

import LoginForm from "./LoginForm";
import UserProfile from "./UserProfile";

const rightMenuItems = [
  {
    label: <Link href="/">Twitter</Link>,
    icon: <TwitterOutlined />,
    key: "link-to-home1",
  },
  {
    label: <Link href="/">Home</Link>,
    icon: <HomeOutlined />,
    key: "link-to-home2",
  },
  {
    label: <Link href="/profile">Profile</Link>,
    icon: <UserOutlined />,
    key: "link-to-profile",
  },
  {
    label: <Link href="/signup">Sign Up</Link>,
    icon: <UsergroupAddOutlined />,
    key: "link-to-signup",
  },
];

const ChildrenWrapper = styled.div`
  width: 600px;
`;

const ChildrenContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const AppLayout = ({ children }) => {
  const { me } = useSelector((state) => state.user);
  const [searchInput, setSearchInput] = useState("");

  const onSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  const onSearch = () => {
    Router.push(`/hashtags/${searchInput}`);
  };

  return (
    <div>
      {/*상단 메뉴*/}
      <Menu
        mode="horizontal"
        items={[
          {
            label: <Link href="/">Twitter</Link>,
            key: "link-to-home",
          },
          {
            label: <Link href="/profile">Profile</Link>,
            key: "link-to-profile",
          },
          {
            label: (
              <Input.Search
                value={searchInput}
                onChange={onSearchInput}
                onSearch={onSearch}
                enterButton
                style={{
                  verticalAlign: "middle",
                }}
              />
            ),
            key: "search",
          },
        ]}
      />
      {/*레이아웃*/}
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {me ? <UserProfile /> : <LoginForm />}
        </Col>
        <Col xs={24} md={12}>
          <ChildrenContainer>
            <ChildrenWrapper>{children}</ChildrenWrapper>
          </ChildrenContainer>
        </Col>
        <Col xs={24} md={6}>
          <Menu items={rightMenuItems} />
        </Col>
      </Row>
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
