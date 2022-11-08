import { apiRequest } from '@api/index';
import { Product } from '@api/types';
import { capitalize } from '@utils/helpers';
import { getPokemonImages, getPokemonPrice, getPokemonTypes, getPokemonVariants, typeColor } from '@utils/pokemon';
import toast from 'react-hot-toast';

const existingIds: number[] = [];
const baseUrl = process.env.BASE_POKI_API_URL || '';

const fetchPokemonById = async (id: number) => {
  return apiRequest<number, Product | null>(baseUrl, 'get', 'pokemon/' + id, {});
};

export const getPokemonById = async (id: number) => {
  try {
    const pokemon = await fetchPokemonById(id);
    return formatPokemonData(pokemon);
  } catch (error) {
    console.error('[getPokemonById][err]', error);
    errorMessage(error);
  }
};

export const getTenPokemon = async () => {
  console.info('[getTenPokemon]');
  const dataPromises = [];
  const data: Product[] = [];
  let count = 1;
  // Generate a random number between 1 and 150
  let id = Math.floor(Math.random() * 150) + 1;
  try {
    while (count < 10 || dataPromises.length < 10) {
      // Check if the pokemon is already in the list
      if (!existingIds.includes(id)) {
        existingIds.push(id);
        dataPromises.push(fetchPokemonById(id));
        count++;
        id = Math.floor(Math.random() * 150) + 1;
      }
    }
    const pokemonData = await Promise.all(dataPromises);
    pokemonData.forEach((pokemon) => {
      data.push(formatPokemonData(pokemon));
    });
    console.log('[getTenPokemon][data]', data);
    return data;
  } catch (error) {
    console.error('[getTenPokemon][err]', error);
    errorMessage(error);
    return [];
  }
};

const formatPokemonData = (data: any) => {
  const images = getPokemonImages(data.sprites.other);
  const price = getPokemonPrice(data);
  const variants = getPokemonVariants(images, price);
  const obj: Product = {
    id: parseInt(data.id),
    healthPoints: data.stats[0].base_stat,
    title: capitalize(data.name),
    types: getPokemonTypes(data.types),
    imageSrc: images[0],
    variants,
    price,
    themeColor: typeColor[data.types[0].type.name],
    statAttack: data.stats[1].base_stat,
    statDefense: data.stats[2].base_stat,
    statSpeed: data.stats[5].base_stat,
  };
  return obj;
};

const errorMessage = (err: any) => {
  const resMessage =
    (err.response && err.response.data && err.response.data.message) || err.message || err.toString() || err[0].msg;
  return toast.error(resMessage);
};
