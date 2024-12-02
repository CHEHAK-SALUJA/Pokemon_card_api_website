import React, { useEffect, useState } from 'react';

const App = () => {
  const [pokemon, setPokemon] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch(
          'https://pokeapi.co/api/v2/pokemon?limit=10'
        );
        if (!response.ok) {
          throw new Error('Failed to fetch Pokémon');
        }
        const data = await response.json();
        const pokemonDetails = await Promise.all(
          data.results.map(async (poke) => {
            const res = await fetch(poke.url);
            const details = await res.json();
            return { name: details.name, image: details.sprites.front_default };
          })
        );
        setPokemon(pokemonDetails);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchPokemon();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div
      style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
    >
      {pokemon.length > 0 ? (
        pokemon.map((poke, index) => (
          <div
            key={index}
            style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '16px',
              margin: '8px',
              textAlign: 'center',
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
              maxWidth: '120px',
            }}
          >
            <img
              src={poke.image}
              alt={poke.name}
              style={{ width: '100px', height: '100px' }}
            />
            <h3 style={{ fontSize: '1rem', margin: '8px 0 0 0' }}>
              {poke.name}
            </h3>
          </div>
        ))
      ) : (
        <p>Loading Pokémon...</p>
      )}
    </div>
  );
};

export default App;
