import React from "react";
import axios from "axios";

export default function Logout({ logout }) {
  return (
    <button type="button" onClick={logout}>
      Logout
    </button>
  );
}
