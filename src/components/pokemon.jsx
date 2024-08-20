import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Importar useParams
import RotomDex from './rottom'; // Corrija o caminho se necessário
import './pokemon.css';

const capitalizeFirstLetter = (str) => {
  if (str.length === 0) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const PokemonList = () => {
  const { generationId } = useParams(); // Obter o parâmetro da URL
  const [pokemonData, setPokemonData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    fetchData();
  }, [generationId]);

  const fetchData = async () => {
    setLoading(true);

    // Mapeia gerações para URLs
    const generationUrls = {
      gen1: 'https://pokeapi.co/api/v2/pokemon?limit=151',
      gen2: 'https://pokeapi.co/api/v2/pokemon?limit=100&offset=151',
      gen3: 'https://pokeapi.co/api/v2/pokemon?limit=135&offset=251',
      gen4: 'https://pokeapi.co/api/v2/pokemon?limit=107&offset=386',
      gen5: 'https://pokeapi.co/api/v2/pokemon?limit=156&offset=493',
      gen6: 'https://pokeapi.co/api/v2/pokemon?limit=72&offset=649',
      gen7: 'https://pokeapi.co/api/v2/pokemon?limit=88&offset=809',
      gen8: 'https://pokeapi.co/api/v2/pokemon?limit=96&offset=905',
    };

    const apiUrl = generationUrls[generationId];

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
      setLoading(false);
    }
  };

  return (
    <div className='pokemon-list'>
      <div className='container-pokemon'>
        {!loading && pokemonData.length > 0 ? (
          pokemonData.map((pokemon) => (
            <div className='div-pokemoncard' key={pokemon.id}>
              <div className='card-image'>
                <img src={pokemon.sprites.front_default} alt={pokemon.name} />
              </div>
              <h2>{capitalizeFirstLetter(pokemon.name.replace(/-/g, ' '))}</h2>
              <p>ID: {pokemon.id}</p>
              <p>Height: {pokemon.height}</p>
              <p>Weight: {pokemon.weight}</p>
              <p>Types: {pokemon.types.map(typeInfo => typeInfo.type.name).join(', ')}</p>
              <button onClick={() => setSelectedPokemon(pokemon)} className='btn-open-dex'>
                Abrir Dex
              </button>
            </div>
          ))
        ) : (
          <p>Aguardando resultados...</p>
        )}
      </div>

      {selectedPokemon && (
        <RotomDex pokemon={selectedPokemon} onClose={() => setSelectedPokemon(null)} />
      )}
    </div>
  );
};

export default PokemonList;
