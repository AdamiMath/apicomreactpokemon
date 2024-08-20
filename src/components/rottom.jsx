import React, { useState } from 'react';
import './RotomDex.css';

const RotomDex = ({ pokemon, onClose }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => onClose(), 500); // Fecha a Dex após a animação
  };

  return (
    <div className={`rotom-dex ${isOpen ? 'open' : 'closed'}`}>
      <div className="rotom-screen">
        {pokemon ? (
          <div className="pokemon-info">
            <img src={pokemon.sprites.front_default} alt={pokemon.name} className="pokemon-image" />
            <h2>{pokemon.name}</h2>
            <p>ID: {pokemon.id}</p>
            <p>Height: {pokemon.height}</p>
            <p>Weight: {pokemon.weight}</p>
            <p>Types: {pokemon.types.map(typeInfo => typeInfo.type.name).join(', ')}</p>
          </div>
        ) : (
          <p>Selecione um Pokémon</p>
        )}
        <button onClick={handleClose} className="btn-close-dex">
          Fechar Dex
        </button>
      </div>
    </div>
  );
};

export default RotomDex;
