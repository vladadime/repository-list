import {BrowserRouter, Route, Routes} from "react-router-dom";
import {HomePage, Repository} from "./pages";

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
