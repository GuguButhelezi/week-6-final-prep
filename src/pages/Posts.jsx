import React from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Posts() {
  const { id } = useParams();
  const [post, setPosts] = useState([]);
  const [load, setLoad] = useState();
  const [searchId, setSearchId] = useState(id);

  function onSearch() {
    fetchPosts(searchId);
  }

  async function fetchPosts(userId) {
    setLoad(true);
    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/posts?userId=${userId || id}`
    );
    setPosts(data);
    setLoad(false);
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  function onSearchKeyPress(key) {
    if (key === "Enter") {
      onSearch();
    }
  }

  return (
    <>
      <div className="post__search">
        <Link to="/">
          <button>← Back</button>
        </Link>
        <div className="post__search--container">
          <label className="post__search--label">Search by Id</label>
          <input
            type="number"
            value={searchId}
            onChange={(event) => setSearchId(event.target.value)}
            onKeyDown={(event) => onSearchKeyPress(event.key)}
          />
          <button onClick={onSearch}>Enter</button>
        </div>
      </div>
      {!load
        ? post.map((post) => (
            <div className="post" key={post.id}>
              <div className="post__title">{post.title}</div>
              <p className="post__body">{post.body}</p>
            </div>
          ))
        : new Array(10).fill(0).map((_, index) => (
            <div className="post" key={index}>
              <div className="post__title">
                <div className="post__title--skeleton"></div>
              </div>
              <div className="post__body">
                <p className="post__body--skeleton"></p>
              </div>
            </div>
          ))}
    </>
  );
}

export default Posts;
