import { useMemo, useState } from "react";

function PostForm({
  appearance = "card",
  heading = "Create Post",
  submitLabel = "Save",
  initialValues = { title: "", content: "" },
  disabled = false,
  resetOnSuccess,
  onSubmit,
  onCancel,
}) {
  const [title, setTitle] = useState(initialValues.title ?? "");
  const [content, setContent] = useState(initialValues.content ?? "");
  const [submitting, setSubmitting] = useState(false);

  const shouldReset = resetOnSuccess ?? !onCancel;

  const canSubmit = useMemo(() => {
    return title.trim().length > 0 && content.trim().length > 0;
  }, [title, content]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    try {
      let ok = false;
      try {
        ok = await onSubmit({
          title: title.trim(),
          content: content.trim(),
        });
      } catch {
        ok = false;
      }

      // Convention: returning false means "don't treat as success".
      if (ok !== false && shouldReset) {
        setTitle("");
        setContent("");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const form = (
    <form className="form" onSubmit={handleSubmit}>
      <label className="field">
        <span className="field__label">Title</span>
        <input
          className="field__control"
          placeholder="Post title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoComplete="off"
          disabled={disabled || submitting}
        />
      </label>

      <label className="field">
        <span className="field__label">Content</span>
        <textarea
          className="field__control field__control--textarea"
          placeholder="Write something..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={3}
          disabled={disabled || submitting}
        />
      </label>

      <div className="form__actions">
        <button
          className="btn"
          type="submit"
          disabled={!canSubmit || disabled || submitting}
        >
          {submitting ? "Saving…" : submitLabel}
        </button>

        {onCancel ? (
          <button
            className="btn btn--ghost"
            type="button"
            onClick={onCancel}
            disabled={disabled || submitting}
          >
            Cancel
          </button>
        ) : null}
      </div>
    </form>
  );

  if (appearance === "inline") {
    return (
      <div className="form-inline">
        {heading ? <div className="form-inline__title">{heading}</div> : null}
        {form}
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card__header">
        <h3 className="card__title">{heading}</h3>
      </div>
      {form}
    </div>
  );
}

export default PostForm;