import { useState } from "react";
import Layout from "./components/layout/Layout";
import About from "./pages/About";
import Home from "./pages/Home";

import "./App.css";

function App() {
  const [page, setPage] = useState("posts");

  return (
    <Layout currentPage={page} onNavigate={setPage}>
      {page === "posts" ? <Home /> : <About />}
    </Layout>
  );
}

export default App;