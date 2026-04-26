const API_URL = "http://localhost:8000/posts";

// GET
export const fetchPosts = async () => {
  const res = await fetch(API_URL);
  return res.json();
};

// POST
export const createPost = async (post) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });
  return res.json();
};

// DELETE
export const deletePost = async (id) => {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
};