import React from "react";
import "./style.css";

import Comment from "../Comment";

function Post({ data }) {
  return (
    <>
      <article>
        <div className="post">
          <div className="profile">
            <img src={data.author.avatar} className="avatar" />
            <div className="user">
              <span className="name">{data.author.name}</span>
              <span className="created-at">{data.date}</span>
            </div>
          </div>
          <div className="content">{data.content}</div>
        </div>
        <div className="comments">
          {data.comments.map((comment) => (
            <Comment key={comment.id} data={comment} />
          ))}
        </div>
      </article>
    </>
  );
}

export default Post;
