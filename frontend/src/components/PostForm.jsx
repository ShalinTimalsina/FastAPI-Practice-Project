import { useState } from "react";

function PostForm({ onCreate }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate({ title, content });
    setTitle("");
    setContent("");
  };

  return (
    <div className="card">
      <h3>Create Post</h3>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Post title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          placeholder="Write something..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button type="submit">Add Post</button>
      </form>
    </div>
  );
}

export default PostForm;