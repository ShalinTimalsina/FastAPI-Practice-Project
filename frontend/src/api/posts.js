const API_URL = "/api/posts";

const parseError = async (res) => {
  try {
    const data = await res.json();
    if (typeof data?.detail === "string") return data.detail;
    return JSON.stringify(data);
  } catch {
    return res.statusText || "Request failed";
  }
};

const requestJson = async (url, options) => {
  const res = await fetch(url, options);
  if (!res.ok) {
    const message = await parseError(res);
    throw new Error(message);
  }
  // Some endpoints may return 204 in the future; keep this safe.
  if (res.status === 204) return null;
  return res.json();
};

// GET
export const fetchPosts = async ({ limit } = {}) => {
  const url = new URL(API_URL, window.location.origin);
  if (typeof limit === "number") {
    url.searchParams.set("limit", String(limit));
  }
  return requestJson(url.toString());
};

export const fetchPostById = async (id) => {
  return requestJson(`${API_URL}/${id}`);
};

// POST
export const createPost = async (post) => {
  return requestJson(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });
};

// PUT
export const updatePost = async (id, post) => {
  return requestJson(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });
};

// DELETE
export const deletePost = async (id) => {
  return requestJson(`${API_URL}/${id}`, {
    method: "DELETE",
  });
};