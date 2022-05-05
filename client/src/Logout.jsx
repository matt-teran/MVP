import React from "react";
import { Button } from "antd";

export default function Logout({ logout }) {
  return (
    <Button type="dashed" danger onClick={logout}>
      Logout
    </Button>
  );
}
