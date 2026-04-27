import PostForm from "../components/PostForm";
import PostList from "../components/PostList";
import InlineAlert from "../components/ui/InlineAlert";
import Toast from "../components/ui/Toast";
import Select from "../components/ui/Select";
import TextField from "../components/ui/TextField";
import { usePosts } from "../hooks/usePosts";

import { useMemo, useState } from "react";

function Home() {
  const {
    posts,
    loading,
    busy,
    error,
    notice,
    clearError,
    clearNotice,
    limit,
    setLimit,
    load,
    create,
    update,
    remove,
  } = usePosts({ initialLimit: 10 });

  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("newest");

  const visiblePosts = useMemo(() => {
    const q = query.trim().toLowerCase();
    let filtered = posts;
    if (q) {
      filtered = posts.filter((p) => {
        return (
          p.title.toLowerCase().includes(q) ||
          p.content.toLowerCase().includes(q)
        );
      });
    }

    const sorted = [...filtered];
    if (sort === "newest") sorted.sort((a, b) => b.id - a.id);
    if (sort === "oldest") sorted.sort((a, b) => a.id - b.id);
    if (sort === "title") sorted.sort((a, b) => a.title.localeCompare(b.title));
    return sorted;
  }, [posts, query, sort]);

  return (
    <div className="page">
      <div className="page__header">
        <div>
          <h1 className="page__title">Posts</h1>
          <p className="page__subtitle">Create, update, delete — nice and simple.</p>
        </div>

        <button
          className="btn btn--ghost"
          type="button"
          onClick={() => load()}
          disabled={loading || busy}
        >
          Refresh
        </button>
      </div>

      {notice ? <Toast onClose={clearNotice}>{notice}</Toast> : null}

      {error ? (
        <InlineAlert variant="error" title="Backend error" onClose={clearError}>
          {error}
        </InlineAlert>
      ) : null}

      <div className="grid">
        <div className="grid__left">
          <div className="listpanel">
            <div className="listpanel__header">
              <h3 className="listpanel__title">Create & browse</h3>
              <span className="muted">{visiblePosts.length} shown</span>
            </div>

            <div className="listpanel__body">
              <div className="stack">
                <PostForm
                  heading="Create Post"
                  submitLabel="Add Post"
                  onSubmit={create}
                  disabled={busy}
                  resetOnSuccess
                />

                <div className="card">
                  <div className="card__header">
                    <h3 className="card__title">Browse</h3>
                  </div>

                  <div className="toolbar">
                    <TextField
                      className="toolbar__search"
                      label="Search"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Title or content…"
                      disabled={loading || busy}
                    />

                    <Select
                      className="toolbar__sort"
                      label="Sort"
                      value={sort}
                      onChange={(e) => setSort(e.target.value)}
                      disabled={loading || busy}
                      options={[
                        { value: "newest", label: "Newest" },
                        { value: "oldest", label: "Oldest" },
                        { value: "title", label: "Title (A→Z)" },
                      ]}
                    />

                    <Select
                      className="toolbar__limit"
                      label="Limit (API)"
                      value={limit == null ? "all" : String(limit)}
                      onChange={async (e) => {
                        const v = e.target.value;
                        const nextLimit = v === "all" ? null : Number(v);
                        setLimit(nextLimit);
                        await load({ limit: nextLimit });
                      }}
                      disabled={loading || busy}
                      options={[
                        { value: "all", label: "All" },
                        { value: "5", label: "5" },
                        { value: "10", label: "10" },
                        { value: "20", label: "20" },
                      ]}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid__right">
          <div className="listpanel">
            <div className="listpanel__header">
              <h3 className="listpanel__title">All posts</h3>
              <span className="muted">{visiblePosts.length}</span>
            </div>

            <div className="listpanel__body">
              {loading ? <p className="muted">Loading…</p> : null}
              <PostList
                posts={visiblePosts}
                onDelete={remove}
                onUpdate={update}
                disabled={busy}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;