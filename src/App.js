import { Route, Routes } from "react-router-dom";
import { privateRoutes } from "./routes/routes";

function App() {
    return (
        <div className="App">
            <Routes>
                {privateRoutes.map((route, index) => {
                    const Page = route.component;
                    return <Route key={index} path={route.path} element={<Page />} />;
                })}
            </Routes>
        </div>
    );
}

export default App;
