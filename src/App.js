import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage";
import Repository from "./pages/Repository/Repository";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={< HomePage />}/>
                    <Route path="/repository/:user/:repo" element={< Repository />}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
