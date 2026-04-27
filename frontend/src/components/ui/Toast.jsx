function Toast({ variant = "success", children, onClose }) {
    return (
        <div className="toast-stack" role="region" aria-label="Notifications">
            <div className={`toast toast--${variant}`} role="status" aria-live="polite">
                <span
                    className={`toast__dot toast__dot--${variant}`}
                    aria-hidden="true"
                />

                <div className="toast__message">{children}</div>

                {onClose ? (
                    <button
                        type="button"
                        className="toast__close"
                        onClick={onClose}
                        aria-label="Dismiss notification"
                    >
                        ×
                    </button>
                ) : null}
            </div>
        </div>
    );
}

export default Toast;
