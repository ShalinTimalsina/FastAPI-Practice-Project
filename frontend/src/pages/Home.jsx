import { useEffect, useState } from "react";
import PostForm from "../components/PostForm";
import PostList from "../components/PostList";
import { fetchPosts, createPost, deletePost } from "../api/posts";

function Home() {
  const [posts, setPosts] = useState([]);

  const loadPosts = async () => {
    const data = await fetchPosts();
    setPosts(data);
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleCreate = async (post) => {
    await createPost(post);
    loadPosts();
  };

  const handleDelete = async (id) => {
    await deletePost(id);
    loadPosts();
  };

  return (
    <div className="container">
      <h1>🚀 My Posts</h1>

      <PostForm onCreate={handleCreate} />

      <PostList posts={posts} onDelete={handleDelete} />
    </div>
  );
}

export default Home;