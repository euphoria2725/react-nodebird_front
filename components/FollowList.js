import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { Card, List, Button } from "antd";
import { StopOutlined } from "@ant-design/icons";
import { UNFOLLOW_REQUEST, REMOVE_FOLLOWER_REQUEST } from "../reducers/user";

const FollowList = ({ header, data }) => {
  const dispatch = useDispatch();

  const onCancel = (id) => {
    if (header === "Following") {
      // 내가 팔로잉하고 있는 사용자라면, 팔로잉을 취소한다.
      dispatch({
        type: UNFOLLOW_REQUEST,
        data: id,
      });
    } else {
      // 나를 팔로우하는 사람이라면, 해당 사용자가 팔로잉한 것을 취소한다.(차단)
      dispatch({
        type: REMOVE_FOLLOWER_REQUEST,
        data: id,
      });
    }
  };

  return (
    <List
      style={{ marginBottom: "20px" }}
      grid={{
        gutter: 4,
        xs: 2,
        md: 3,
      }}
      size="small"
      header={<div>{header}</div>}
      // 추후에 '더 보기' 기능 구현하기
      loadMore={
        <div style={{ textAlign: "center", margin: "10px 0" }}>
          <Button>더 보기</Button>
        </div>
      }
      bordered
      dataSource={data}
      renderItem={(item) => (
        <List.Item style={{ marginTop: "20px" }}>
          <Card
            actions={[
              <StopOutlined
                key="stop"
                onClick={() => {
                  onCancel(item.id);
                }}
              />,
            ]}
          >
            <Card.Meta description={item.nickname} />
          </Card>
        </List.Item>
      )}
    />
  );
};

FollowList.propTypes = {
  header: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};

export default FollowList;
