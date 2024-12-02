"use client";

import { useEffect, useState } from "react";
import { Pokemon } from "./types";
import Card from "./components/Card";
import Navigation from "./components/Navigation";
import Menu from "./components/Menu";
import Finder from "./components/Finder";

export default function Home() {
  const url = "https://pokeapi.co/api/v2/pokemon?limit=151";
  const [pokemons, setPokemons] = useState<Array<Pokemon>>([]);
  const [currentPokemon, setCurrentPokemon] = useState<Pokemon>();
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState<Array<Pokemon>>([]);

  // const filterPokemons = (pokemons: Array<Pokemon>, search: string) => {};

  const handlePrevNavigation = (page: number) => {
    if (page > 1) {
      setCurrentPage(page - 1);
    }
  };

  const handleNextNavigation = (page: number) => {
    setCurrentPage(page + 1);
  };

  const handlePressCard = (pokemon: Pokemon) => {
    setCurrentPokemon(pokemon);
  };

  const handleChangeSearch = (search: string) => {
    setSearch(search);
  };

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        setPokemons([]);
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

  useEffect(() => {
    if (search === "") {
      setFiltered([]);
    } else {
      const filter = pokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().startsWith(search.toLowerCase())
      );
      setFiltered(filter);
    }
  }, [search, pokemons]);

  return (
    <div className="flex flex-row ">
      <div>
        <Finder
          handleChangeSearch={handleChangeSearch}
          setPage={setCurrentPage}
        ></Finder>
        <div className="grid grid-cols-3 gap-5">
          {filtered.length != 0 ? (
            filtered
              .slice(9 * (currentPage - 1), 9 * (currentPage - 1) + 9)
              .map((pokemon, i) => {
                return (
                  <Card
                    key={i}
                    pokemon={pokemon}
                    handlePressCard={handlePressCard}
                  ></Card>
                );
              })
          ) : (
            <></>
          )}
          {pokemons.length != 0 && search === "" ? (
            pokemons
              .slice(9 * (currentPage - 1), 9 * (currentPage - 1) + 9)
              .map((pokemon, i) => {
                return (
                  <Card
                    key={i}
                    pokemon={pokemon}
                    handlePressCard={handlePressCard}
                  ></Card>
                );
              })
          ) : (
            <></>
          )}
        </div>
      </div>

      <div className="flex flex-col justify-center items-center">
        {currentPokemon ? (
          <Menu currentPokemon={currentPokemon}></Menu>
        ) : (
          <div className="flex flex-col justify-center items-center w-96 border p-5 h-full"></div>
        )}

        <Navigation
          currentPage={currentPage}
          handleNextNavigation={handleNextNavigation}
          handlePrevNavigation={handlePrevNavigation}
        ></Navigation>
      </div>
    </div>
  );
}
