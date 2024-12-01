export type Pokemon = {
  name: string;
  url: string;
};

export type CardData = {
  name: string;
  id: number;
  sprite: string;
  types: Array<{ type: { name: string; url: string } }>;
};

export type MenuData = {
  name: string;
  id: number;
  sprite: string;
  types: Array<{ type: { name: string; url: string } }>;
  height: number;
  weight: number;
  stats: Array<{ base_stat: number; stat: { name: string } }>;
  abilities: Array<{ ability: { name: string }; is_hidden: boolean }>;
  base_experience: number;
  description: string;
  evolutions: Chain;
  //   pre_evo?: Pokemon;
  //   evolution?: Pokemon;
};

type Chain = {
  species: { name: string };
  evolves_to?: Array<{
    species: { name: string };
    evolves_to?: Array<{ species: { name: string } }>;
  }>;
};
