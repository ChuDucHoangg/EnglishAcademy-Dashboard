import Layout from "./components/layouts/index";
function App() {
    return (
        <div className="App">
            <Layout>
                <button className="btn btn-primary d-grid">
                    <span className="text-truncate w-100">Create new Transaction</span>
                </button>
            </Layout>
        </div>
    );
}

export default App;
