import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import { useCallback, useState } from "react";

function Layout({ currentPage, onNavigate, children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleNavigate = useCallback(
        (next) => {
            onNavigate(next);
            setSidebarOpen(false);
        },
        [onNavigate]
    );

    return (
        <div className="app-shell">
            <Topbar
                currentPage={currentPage}
                onNavigate={handleNavigate}
                sidebarOpen={sidebarOpen}
                onToggleSidebar={() => setSidebarOpen((v) => !v)}
            />

            <div className="app-body">
                <div
                    className={`backdrop ${sidebarOpen ? "backdrop--open" : ""}`}
                    onClick={() => setSidebarOpen(false)}
                />

                <Sidebar
                    currentPage={currentPage}
                    onNavigate={handleNavigate}
                    isOpen={sidebarOpen}
                    onClose={() => setSidebarOpen(false)}
                />

                <main className="app-content" role="main">
                    {children}
                </main>
            </div>
        </div>
    );
}

export default Layout;
