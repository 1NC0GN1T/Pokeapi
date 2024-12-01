"use client";
import React, { useEffect, useState } from "react";

import { Pokemon, CardData } from "../types";

interface cardProps {
  pokemon: Pokemon;
  handlePressCard: (pokemon: Pokemon) => void;
}

function Card({ pokemon, handlePressCard }: cardProps) {
  const [pokeData, setPokeData] = useState<CardData>();
  useEffect(() => {
    const fetchPokeData = async () => {
      try {
        const res = await fetch(pokemon.url);
        const jsonRes = await res.json();
        const {
          id,
          name,
          types,
          sprites: {
            versions: {
              "generation-v": {
                "black-white": {
                  animated: { front_default },
                },
              },
            },
          },
        } = jsonRes;
        const data = {
          id: id,
          name: name,
          sprite: front_default,
          types: types,
        };
        setPokeData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPokeData();
  }, [pokemon]);
  return (
    <div className="">
      {pokeData ? (
        <div>
          <p>{pokeData.id}</p>
          <button
            onClick={() => {
              handlePressCard(pokemon);
            }}
          >
            <img src={pokeData.sprite} alt="no image"></img>
          </button>

          <p>{pokeData.name}</p>
          {pokeData.types.map((type, i) => {
            return <p key={i}> {type.type.name}</p>;
          })}
        </div>
      ) : (
        <p>No data</p>
      )}
    </div>
  );
}

export default Card;
