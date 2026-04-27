import { useState } from "react";
import PostForm from "./PostForm";
import ConfirmDialog from "./ui/ConfirmDialog";

function PostList({ posts, onDelete, onUpdate, disabled = false }) {
  const [editingId, setEditingId] = useState(null);
  const [pendingDelete, setPendingDelete] = useState(null);
  const [confirmBusy, setConfirmBusy] = useState(false);

  if (posts.length === 0) {
    return <p className="muted">No posts yet… create one above.</p>;
  }

  return (
    <>
      <div className="stack">
        {posts.map((post) => {
          const isEditing = editingId === post.id;

          return (
            <div className="card" key={post.id}>
              <div className="card__header card__header--row">
                <h3 className="card__title">{post.title}</h3>
                <span className="pill">#{post.id}</span>
              </div>

              {isEditing ? (
                <PostForm
                  appearance="inline"
                  heading="Edit Post"
                  submitLabel="Update"
                  initialValues={{ title: post.title, content: post.content }}
                  disabled={disabled}
                  onSubmit={async (values) => {
                    const ok = await onUpdate(post.id, values);
                    if (ok !== false) setEditingId(null);
                  }}
                  onCancel={() => setEditingId(null)}
                />
              ) : (
                <>
                  <p className="post__content">{post.content}</p>

                  <div className="row row--right">
                    <button
                      type="button"
                      className="btn btn--ghost"
                      onClick={() => setEditingId(post.id)}
                      disabled={disabled}
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      className="btn btn--danger"
                      onClick={() => {
                        if (disabled) return;
                        setPendingDelete(post);
                      }}
                      disabled={disabled}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>

      <ConfirmDialog
        open={!!pendingDelete}
        title="Delete post?"
        description={
          pendingDelete
            ? `Delete “${pendingDelete.title}”? This can’t be undone.`
            : undefined
        }
        confirmLabel="Delete"
        cancelLabel="Keep"
        variant="danger"
        busy={confirmBusy || disabled}
        onCancel={() => {
          if (confirmBusy) return;
          setPendingDelete(null);
        }}
        onConfirm={async () => {
          if (!pendingDelete) return;
          setConfirmBusy(true);
          try {
            await onDelete(pendingDelete.id);
            setPendingDelete(null);
          } finally {
            setConfirmBusy(false);
          }
        }}
      />
    </>
  );
}

export default PostList;