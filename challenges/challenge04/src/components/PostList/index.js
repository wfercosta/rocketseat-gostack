import React, { Component } from "react";
import "./style.css";

import Post from "../Post";

class PostList extends Component {
  state = {
    posts: [
      {
        id: 1,
        author: {
          name: "Daenerys Targaryen",
          avatar:
            "https://vignette.wikia.nocookie.net/gameofthrones/images/e/ee/QueenDaenerysTargaryenIronThrone.PNG/revision/latest/top-crop/width/360/height/360?cb=20190520173137",
        },
        date: "04 Jun 2019",
        content: "The law is the law! Dracarys!",
        comments: [
          {
            id: 1,
            author: {
              name: "Cersei Lannister",
              avatar:
                "https://lh3.googleusercontent.com/proxy/5mWwr9QKhz4LMy9uoEBRzIqxluVAVwOEsQ_VzkhseDaxpisKFqPghGj_7p2GcJhwy-1elJNHpWF5DrOU4ZzAXifNN-J2AdZ-EKOUE_b83rOXHCZUyMfkYf1Q7v49I27jyLxO_-XXjFiA13hfIot9ztaizVc1R396OkAqRoZps9wW1N8",
            },
            content:
              "I thought if I could make something good so pure... maybe I'm not a moster",
          },
        ],
      },
      {
        id: 2,
        author: {
          name: "Jon Snow",
          avatar: "https://avatarfiles.alphacoders.com/117/117500.jpg",
        },
        date: "04 Jun 2019",
        content: "It's cold up here for a southern girl",
        comments: [
          {
            id: 1,
            author: {
              name: "Daenerys Targaryen",
              avatar:
                "https://vignette.wikia.nocookie.net/gameofthrones/images/e/ee/QueenDaenerysTargaryenIronThrone.PNG/revision/latest/top-crop/width/360/height/360?cb=20190520173137",
            },
            content: "So keep your queen warm",
          },
          {
            id: 1,
            author: {
              name: "Ygritte",
              avatar:
                "https://vignette.wikia.nocookie.net/gameofthrones/images/2/28/Ygritte-promotionals4pic.jpg/revision/latest/top-crop/width/360/height/360?cb=20170107042949",
            },
            content: "You know nothing, Jon Snow.",
          },
        ],
      },
    ],
  };

  render() {
    return (
      <>
        <div className="posts">
          {this.state.posts.map((post) => (
            <Post key={post.id} data={post} />
          ))}
        </div>
      </>
    );
  }
}

export default PostList;
