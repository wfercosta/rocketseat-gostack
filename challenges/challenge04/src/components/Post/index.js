import React from "react";
import "./style.css";

import Comment from "../Comment";

function Post({ data }) {
  return (
    <>
      {data.comments.map( comment => <Comment key={comment.id} data={comment} />)}
    </>
  );
}

export default Post;
