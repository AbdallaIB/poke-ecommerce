type tplotOptions = {
  [key: string]: string;
};

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

export type Cart = {
  productId: string;
  productTitle: string;
  productImage: string;
  variantId: number;
  variantTitle: string;
  variantPrice: number;
  variantQuantity: number;
};

export const typeColor: tplotOptions = {
  bug: '#26de81',
  dragon: '#ffeaa7',
  electric: '#fed330',
  fairy: '#FF0069',
  fighting: '#30336b',
  fire: '#f0932b',
  flying: '#81ecec',
  grass: '#00b894',
  ground: '#EFB549',
  ghost: '#a55eea',
  ice: '#74b9ff',
  normal: '#95afc0',
  poison: '#6c5ce7',
  psychic: '#a29bfe',
  rock: '#2d3436',
  water: '#0190FF',
};

export const getPokemonTypes = (types: any) => {
  const pokemonTypes: PokemonType[] = [];
  types.forEach((type: { type: { name: string; color: string } }) => {
    pokemonTypes.push({
      name: type.type.name,
      color: typeColor[type.type.name],
    });
  });
  return pokemonTypes;
};

export const getPokemonImages = (obj: any): string[] => {
  const getObjValues: any = (obj: any) =>
    obj && typeof obj === 'object'
      ? Object.values(obj)
          .map(getObjValues)
          .reduce((a: any, b) => a.concat(b), [])
      : [obj];
  console.log(getObjValues(obj).filter((item: any) => typeof item === 'string'));

  return getObjValues(obj).filter((item: any) => typeof item === 'string');
};

export const getPokemonVariants = (images: string[], price: number): PokemonVariants[] => {
  const variants: PokemonVariants[] = [];
  const imageTypes: string[] = ['Default', 'Dream World', 'Home', 'Home - Shiny', 'Artwork'];
  imageTypes.forEach((item, index) => {
    if (images[index])
      variants.push({
        id: index,
        title: item,
        price: price * index * 0.5,
        image: images[index],
      });
  });
  return variants;
};

export const saveCart = (cart: Cart[]) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

export const getCart = (): Cart[] => {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
};
