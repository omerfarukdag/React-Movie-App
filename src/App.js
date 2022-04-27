import Home from "./Home";
import Header from "./Header";
import Movie from "./Movie";
import {Route, Routes} from "react-router-dom";

function App() {
    return (
        <>
            <Header/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/movie/:id" element={<Movie/>}/>
                <Route path="/popular" element={<Home type={"popular"}/>}/>
                <Route path="/now-playing" element={<Home type={"now_playing"}/>}/>
                <Route path="/upcoming" element={<Home type={"upcoming"}/>}/>
                <Route path="/top-rated" element={<Home type={"top_rated"}/> }/>
            </Routes>
        </>
    );
}

export default App;
