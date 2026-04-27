function InlineAlert({ variant = "error", title, children, onClose }) {
    return (
        <div className={`alert alert--${variant}`} role="alert">
            <div className="alert__content">
                {title ? <div className="alert__title">{title}</div> : null}
                <div className="alert__body">{children}</div>
            </div>

            {onClose ? (
                <button type="button" className="alert__close" onClick={onClose}>
                    ×
                </button>
            ) : null}
        </div>
    );
}

export default InlineAlert;
