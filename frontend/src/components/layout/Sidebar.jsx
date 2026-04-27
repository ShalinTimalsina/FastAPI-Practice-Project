function Sidebar({ currentPage, onNavigate, isOpen = false, onClose }) {
    return (
        <aside
            id="app-sidebar"
            className={`sidebar ${isOpen ? "sidebar--open" : ""}`}
            aria-label="Sidebar"
        >
            <div className="sidebar__section">
                <div className="sidebar__title">Navigation</div>

                <button
                    type="button"
                    className={`sideitem ${currentPage === "posts" ? "sideitem--active" : ""}`}
                    onClick={() => onNavigate("posts")}
                >
                    Manage Posts
                </button>

                <button
                    type="button"
                    className={`sideitem ${currentPage === "about" ? "sideitem--active" : ""}`}
                    onClick={() => onNavigate("about")}
                >
                    About This App
                </button>

                {onClose ? (
                    <button
                        type="button"
                        className="btn btn--ghost sidebar__close"
                        onClick={onClose}
                    >
                        Close
                    </button>
                ) : null}
            </div>

            <div className="sidebar__section sidebar__section--muted">
                <div className="sidebar__title">Tips</div>
                <ul className="sidebar__list">
                    <li>Use the dropdowns to sort/filter.</li>
                    <li>Edit posts inline (no popups).</li>
                </ul>
            </div>
        </aside>
    );
}

export default Sidebar;
