import React, { useState, useEffect } from 'react';
import './pokemon.css';

const PokemonList = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [generation, setGeneration] = useState('gen1');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, [generation]); // Chama fetchData sempre que a geração é alterada

  const fetchData = async () => {
    setLoading(true); // Ativa o indicador de carregamento

    let apiUrl;

    if (generation === 'gen1') {
      apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=151';
    } else if (generation === 'gen2') {
      apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=100&offset=151';
    } else if (generation === 'gen3') {
      apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=135&offset=251';
    }

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Erro ao buscar dados dos Pokémon');
      }

      const data = await response.json();

      const pokemonDetails = await Promise.all(
        data.results.map(async (pokemon) => {
          const detailedResponse = await fetch(pokemon.url);
          if (!detailedResponse.ok) {
            throw new Error(`Erro ao buscar detalhes do Pokémon ${pokemon.name}`);
          }

          const detailedData = await detailedResponse.json();
          return detailedData;
        })
      );

      setPokemonData(pokemonDetails);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false); // Desativa o indicador de carregamento
    }
  };

  return (
    <div className='pokemon-list'>
    <div className='options'>
      <input
        type="radio"
        id="gen1"
        name="generation"
        value="gen1"
        checked={generation === 'gen1'}
        onChange={() => setGeneration('gen1')}
      />
      <label htmlFor="gen1">Gen 1</label>

      <input
        type="radio"
        id="gen2"
        name="generation"
        value="gen2"
        checked={generation === 'gen2'}
        onChange={() => setGeneration('gen2')}
      />
      <label htmlFor="gen2">Gen 2</label>

      <input
        type="radio"
        id="gen3"
        name="generation"
        value="gen3"
        checked={generation === 'gen3'}
        onChange={() => setGeneration('gen3')}
      />
      <label htmlFor="gen3">Gen 3</label>
      
      <button onClick={fetchData} disabled={loading}>
        {loading ? 'Buscando Pokémon...' : 'Buscar Pokémon'}
      </button>
    </div>

    <div className='container-pokemon'>
      {!loading && pokemonData.length > 0 ? (
        pokemonData.map((pokemon, index) => (
          <div className='div-pokemoncard' key={index}>
            <h2>{pokemon.name}</h2>
            <p>ID: {pokemon.id}</p>
            <p>Height: {pokemon.height}</p>
            <p>Weight: {pokemon.weight}</p>
            <div>
              <strong>Foto:</strong> <img src={pokemon.sprites.front_default} alt="" />
            </div>
          </div>
        ))
      ) : (
        <p>Aguardando resultados...</p>
      )}
    </div>
  </div>
);
};


export default PokemonList;
