/* eslint-disable @next/next/no-img-element */
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
    <div className=" flex flex-col justify-center items-center border rounded-md min-w-32 min-h-48">
      {pokeData ? (
        <div className=" flex flex-col justify-center items-center border rounded-md min-w-32 max-h-36">
          <p>{pokeData.id}</p>
          <button
            className="max-w-20  h-20  p-1 border"
            onClick={() => {
              handlePressCard(pokemon);
            }}
          >
            <img className="" src={pokeData.sprite} alt="no image"></img>
          </button>

          <p>{pokeData.name}</p>
          <div className="flex flex-row justify-around items-center gap-2">
            {pokeData.types.map((type, i) => {
              return <p key={i}> {type.type.name}</p>;
            })}
          </div>
        </div>
      ) : (
        <div className=" flex flex-col justify-center items-center border rounded-md min-w-32"></div>
      )}
    </div>
  );
}

export default Card;
