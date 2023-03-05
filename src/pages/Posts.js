import React from "react";
import { ChatState } from "../Context/ChatProvider";

const Posts = ({ posts, loading }) => {
  const { details } = ChatState();

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <ul className="list-group mb-4">
      {details.map((p, i) => (
        <li key={i} className="list-group-item">
          {p.todo}
        </li>
      ))}
    </ul>
  );
};

export default Posts;
