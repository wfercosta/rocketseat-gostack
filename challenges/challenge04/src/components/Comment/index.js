import React from "react";
import "./style.css";

function Comment({data}) {
  return (
    <>
      <div className="comment">
        <img src={data.author.avatar} className="avatar"/>
        <div className="content"><strong>{data.author.name}</strong>&nbsp;{data.content}</div>
      </div>
    </>
  );
}

export default Comment;
