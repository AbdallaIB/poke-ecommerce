import { Product } from '@utils/pokemon';
import create from 'zustand';

type ProductStore = {
  products: Product[];
  addProducts: (newProducts: Product[]) => void;
  isDataFetched: boolean;
  setIsDataFetched: (isDataFetched: boolean) => void;
};

const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  addProducts: (newProducts: Product[]) => {
    const { products } = get();
    const newProductList = [...products, ...newProducts];
    set((state) => ({
      ...state,
      products: newProductList,
    }));
  },
  isDataFetched: false,
  setIsDataFetched: (isDataFetched: boolean) => {
    set((state) => ({
      ...state,
      isDataFetched,
    }));
  },
}));

export default useProductStore;
