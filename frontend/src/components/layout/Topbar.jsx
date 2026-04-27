function Topbar({ currentPage, onNavigate, sidebarOpen, onToggleSidebar }) {
    return (
        <header className="topbar">
            <div className="topbar__left">
                <button
                    type="button"
                    className="iconbtn iconbtn--menu"
                    aria-label={sidebarOpen ? "Close menu" : "Open menu"}
                    aria-expanded={sidebarOpen}
                    aria-controls="app-sidebar"
                    onClick={onToggleSidebar}
                >
                    <span aria-hidden="true">{sidebarOpen ? "×" : "☰"}</span>
                </button>

                <button
                    type="button"
                    className="brand"
                    onClick={() => onNavigate("posts")}
                >
                    <span className="brand__logo">FP</span>
                    <span className="brand__name">FastAPI Practice</span>
                </button>
            </div>

            <nav className="topbar__nav" aria-label="Top navigation">
                <button
                    type="button"
                    className={`navlink ${currentPage === "posts" ? "navlink--active" : ""}`}
                    onClick={() => onNavigate("posts")}
                >
                    Posts
                </button>
                <button
                    type="button"
                    className={`navlink ${currentPage === "about" ? "navlink--active" : ""}`}
                    onClick={() => onNavigate("about")}
                >
                    About
                </button>
            </nav>
        </header>
    );
}

export default Topbar;
