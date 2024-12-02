/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { MenuData, Pokemon } from "../types";

interface menuProps {
  currentPokemon: Pokemon;
}

async function fetching(url: string) {
  const res = await fetch(url);
  const json = await res.json();
  return json;
}

function Menu({ currentPokemon }: menuProps) {
  const [menuData, setMenuData] = useState<MenuData>();
  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const pokemonData = await fetching(currentPokemon.url);
        const {
          id,
          name,
          types,
          height,
          weight,
          stats,
          abilities,
          base_experience,
          sprites: {
            versions: {
              "generation-v": {
                "black-white": {
                  animated: { front_default },
                },
              },
            },
          },
          species: { url },
        } = pokemonData;
        const specie = await fetching(url);
        const {
          flavor_text_entries: [{ flavor_text }],
          evolution_chain,
        } = specie;
        const evolutions = await fetching(evolution_chain.url);
        const { chain } = evolutions;
        const data = {
          id: id,
          name: name,
          sprite: front_default,
          types: types,
          height: height,
          weight: weight,
          stats: stats,
          abilities: abilities,
          description: flavor_text,
          evolutions: chain,
          base_experience: base_experience,
        };
        setMenuData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMenuData();
  }, [currentPokemon]);
  return (
    <div>
      {menuData ? (
        <div className="flex flex-col justify-center items-center w-96 border p-5">
          <img src={menuData.sprite} alt="no image"></img>

          <p>#{menuData.id}</p>
          <p>{menuData.name.toUpperCase()}</p>

          <div className="flex flex-row gap-5">
            {menuData.types.map((type, i) => {
              return (
                <p className="border py-1 px-3 min-w-16" key={i}>
                  {" "}
                  {type.type.name.toUpperCase()}
                </p>
              );
            })}
          </div>

          <p className="font-bold mt-5">ABILITIES</p>
          <div className="flex flex-row gap-5">
            {menuData.abilities.map((ability, i) => {
              return (
                <p className="border py-1 px-3 min-w-16" key={i}>
                  {" "}
                  {ability.ability.name}
                </p>
              );
            })}
          </div>

          <p className="font-bold mt-5">POKEDEX ENTRY</p>
          <p className="text-center w-72 mb-5">{menuData.description}</p>

          <div className="flex flex-row gap-5">
            <div className="flex flex-col justify-center items-center">
              <p className="font-bold">HEIGHT</p>
              <p>{menuData.height} m</p>
            </div>
            <div className="flex flex-col justify-center items-center">
              <p className="font-bold">WEIGHT</p>
              <p>{menuData.weight} kg</p>
            </div>
          </div>

          <div className="flex flex-row gap-5 mt-5">
            <div className="flex flex-col justify-center items-center">
              <p className="font-bold">WEAKNESS</p>
              <p>{menuData.height} m</p>
            </div>
            <div className="flex flex-col justify-center items-center">
              <p className="font-bold">BASE EXPERIENCE</p>
              <p>{menuData.base_experience}</p>
            </div>
          </div>

          <p className="font-bold mt-5">EVOLUTION CHAIN</p>
          <div className="flex flex-row gap-5">
            <p>{menuData.evolutions.species.name}</p>
            {menuData.evolutions.evolves_to ? (
              <div className="flex flex-row gap-5">
                <p>{menuData.evolutions.evolves_to[0].species.name}</p>
                {menuData.evolutions.evolves_to[0]?.evolves_to ? (
                  <p>
                    {
                      menuData.evolutions.evolves_to[0].evolves_to[0]?.species
                        ?.name
                    }
                  </p>
                ) : (
                  <p></p>
                )}
              </div>
            ) : (
              <p></p>
            )}
          </div>
        </div>
      ) : (
        <p> No data </p>
      )}
    </div>
  );
}

export default Menu;
