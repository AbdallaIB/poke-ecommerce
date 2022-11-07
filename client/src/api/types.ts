export type Product = {
  id: number;
  healthPoints: number;
  title: string;
  types: PokemonType[];
  price: number;
  variants: PokemonVariants[];
  imageSrc: string;
  themeColor: string;
  statAttack: number;
  statDefense: number;
  statSpeed: number;
};

export type PokemonType = {
  name: string;
  color: string;
};

export type PokemonVariants = {
  id: number;
  title: string;
  price: number;
  image: string;
};
