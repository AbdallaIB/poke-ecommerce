import Filter from '@components/filter';
import ProductListings from '@components/products/ProductListings';
import SearchBar from '@components/searchbar';
import Button from '@components/shared/button';
import { getTenPokemon } from '@api/pokemon';
import { useEffect, useState } from 'react';
import { Product } from '@api/types';
import useToast from '@lib/hooks/useToast';
import Loader from '@components/loader';
import useProductStore from '@lib/stores/product';
import Pokeball from '@assets/pokeball.png';

const IndexPage = () => {
  const { errorMessage } = useToast();
  const { isDataFetched, products, addProducts, setIsDataFetched } = useProductStore();
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    if (isDataFetched) return;
    fetchData();
    setIsDataFetched(true);
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const newItems = await getTenPokemon();
      addProducts(newItems);
      setIsLoading(false);
    } catch (error) {
      errorMessage(error);
      setIsLoading(false);
    }
  };

  const getFilterItems = (data: Product[]) => {
    const items: string[] = [];
    data.forEach((item) => {
      const types = item.types.map((type) => type.name);
      types.forEach((type) => items.push(type));
    });
    return new Set(items);
  };

  const data = Object.values(products);

  const filterItems = [...getFilterItems(data)];

  const search = (items: Product[]) => {
    if (query === '' && filter === '') return items;
    return items.filter((item) => {
      const types = item.types.map((type) => type.name.toLowerCase());
      const searchQuery = query ? item['title'].toLowerCase().includes(query) : true;
      const searchFilter = filter ? types.includes(filter) : true;
      return searchFilter && searchQuery;
    });
  };

  const loadMore = () => {
    fetchData();
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <h1 className="leading-relaxed font-primary font-extrabold text-4xl text-center text-palette-primary mt-4 py-2 sm:py-4 text-main">
        Get your favorite Pokemon!
      </h1>
      <div className="flex flex-row gap-1 mb-8 text-main_dark">
        The perfect place to catch them all. <img className="w-4 object-contain" alt="pokeball" src={Pokeball}></img>{' '}
      </div>
      <div className="flex flex-row items-center justify-center gap-6">
        <SearchBar value={query} setValue={(e) => setQuery(e.toLowerCase())} placeholder={'Search for a Pokemon'} />
        <Filter items={filterItems} setFilter={setFilter}></Filter>
      </div>
      {isLoading ? <Loader></Loader> : <ProductListings products={search(data)} />}
      <div className="flex w-full justify-center items-center mb-4">
        <Button text="Load More" isPrimary onClick={loadMore}></Button>
      </div>
    </div>
  );
};

export default IndexPage;
