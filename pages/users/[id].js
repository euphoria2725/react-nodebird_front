import React from "react";
import { useRouter } from "next/router";

const Users = () => {
  const router = useRouter();
  const { id } = router.query;

  return <div>{id}번 사용자</div>;
};

export default Users;
