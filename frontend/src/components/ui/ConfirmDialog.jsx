import { useEffect, useId, useRef } from "react";

function ConfirmDialog({
    open,
    title = "Are you sure?",
    description,
    confirmLabel = "Confirm",
    cancelLabel = "Cancel",
    variant = "danger",
    busy = false,
    onConfirm,
    onCancel,
}) {
    const titleId = useId();
    const descriptionId = useId();
    const cancelRef = useRef(null);

    useEffect(() => {
        if (!open) return;

        // Focus cancel by default to avoid accidental destructive actions.
        cancelRef.current?.focus();

        const onKeyDown = (e) => {
            if (e.key === "Escape") onCancel?.();
        };

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [open, onCancel]);

    if (!open) return null;

    const isDanger = variant === "danger";

    return (
        <div
            className="modal-backdrop"
            role="presentation"
            onMouseDown={(e) => {
                // Close only when clicking the backdrop itself.
                if (e.target === e.currentTarget) onCancel?.();
            }}
        >
            <div
                className="modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                aria-describedby={description ? descriptionId : undefined}
            >
                <div className="modal__header">
                    <div className="modal__title" id={titleId}>
                        {title}
                    </div>
                    <button
                        type="button"
                        className="modal__close"
                        onClick={onCancel}
                        aria-label="Close dialog"
                    >
                        ×
                    </button>
                </div>

                {description ? (
                    <div className="modal__body" id={descriptionId}>
                        {description}
                    </div>
                ) : null}

                <div className="modal__actions">
                    <button
                        type="button"
                        className="btn btn--ghost"
                        onClick={onCancel}
                        disabled={busy}
                        ref={cancelRef}
                    >
                        {cancelLabel}
                    </button>

                    <button
                        type="button"
                        className={isDanger ? "btn btn--danger" : "btn"}
                        onClick={onConfirm}
                        disabled={busy}
                    >
                        {busy ? "Working…" : confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmDialog;
