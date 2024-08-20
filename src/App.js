import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import PokemonList from './components/pokemon';

const App = () => {
  return (
    <Router>
    <Routes>
      {/* Certifique-se de que o caminho "/" renderize o componente Home */}
      <Route path="/" element={<Home />} />
      {/* Outra rota para a lista de Pokémon */}
      <Route path="/pokemon/:generationId" element={<PokemonList />} />
    </Routes>
  </Router>
  );
};

export default App;
