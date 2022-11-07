import ProductCard from '@components/products/ProductCard';
import { Product } from '@api/types';

interface Props {
  products: Product[];
}

const ProductListings = ({ products }: Props) => {
  return (
    <div className="my-12 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
      {products.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
    </div>
  );
};

export default ProductListings;
