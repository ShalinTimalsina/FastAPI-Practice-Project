import { useState } from "react";
function PostList({ posts, onDelete }) {
  if (posts.length === 0) {
    return <p>No posts yet...</p>;
  }

  return (
    <div>
      {posts.map((post) => (
        <div className="card" key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>

          <button
            className="delete-btn"
            onClick={() => onDelete(post.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default PostList;