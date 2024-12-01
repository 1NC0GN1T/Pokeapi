"use client";

import { useEffect, useState } from "react";
import { Pokemon } from "./types";
import Card from "./components/Card";
import Navigation from "./components/Navigation";
import Menu from "./components/Menu";

export default function Home() {
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon?limit=9");
  const [pokemons, setPokemons] = useState<Array<Pokemon>>([]);
  const [currentPokemon, setCurrentPokemon] = useState<Pokemon>();

  const handleNewRequest = (url: string) => {
    setUrl(url);
  };

  const handlePressCard = (pokemon: Pokemon) => {
    setCurrentPokemon(pokemon);
  };

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const res = await fetch(url);
        const jsonRes = await res.json();
        const { results } = jsonRes;
        results.forEach((pokemon: Pokemon) => {
          console.log(`Agregando pokemon ${pokemon.name}`);
          setPokemons((prev) => [...prev, pokemon]);
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchPokemons();
  }, [url]);
  return (
    <div className="flex flex-row ">
      <div className="grid grid-cols-3 gap-5">
        {pokemons.length != 0 ? (
          pokemons.map((pokemon, i) => {
            return (
              <Card
                key={i}
                pokemon={pokemon}
                handlePressCard={handlePressCard}
              ></Card>
            );
          })
        ) : (
          <p>Sin data</p>
        )}
      </div>
      <div>
        {currentPokemon ? (
          <Menu currentPokemon={currentPokemon}></Menu>
        ) : (
          <p>No menu</p>
        )}

        <Navigation handleNewRequest={handleNewRequest}></Navigation>
      </div>
    </div>
  );
}
