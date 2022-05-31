import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import Home from "./Pages/Home";
import Header from "./Components/Header";
import PokemonDetails from "./Pages/PokemonDetails";

function App() {
  return (
      <Router>
        <Header />
        <Container>
          <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route path="/pokemon/:id" element={<PokemonDetails/>} />
          </Routes>
        </Container>
      </Router>
  );
}

export default App;
