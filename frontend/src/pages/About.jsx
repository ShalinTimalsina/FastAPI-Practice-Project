function About() {
    return (
        <div className="page">
            <h1 className="page__title">About</h1>
            <p className="page__subtitle">
                A tiny React + FastAPI CRUD app with a cleaner layout and simple code.
            </p>

            <div className="card">
                <h3>What you can do</h3>
                <ul>
                    <li>Create posts</li>
                    <li>Update posts</li>
                    <li>Delete posts</li>
                    <li>Sort & filter</li>
                </ul>
            </div>
        </div>
    );
}

export default About;
