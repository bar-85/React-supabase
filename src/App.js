import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Create from "./pages/Create";
import Home from "./pages/Home";
import Update from "./pages/Update";


function App() {
  return (
    <BrowserRouter>
      <nav>
        <h1>Notatnik hodowcy</h1>
        <Link to='/'>Strona główna</Link>
        <Link to='/create'>Dodaj nową notatkę</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/:id" element={<Update />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
