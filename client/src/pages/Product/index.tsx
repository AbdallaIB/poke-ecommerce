import { getPokemonById } from '@api/pokemon';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductSection from '@components/products/ProductSection';
import useToast from '@lib/hooks/useToast';
import { Product } from '@api/types';
import Loader from '@components/loader';

const ProductPage = () => {
  let { id } = useParams();
  const { errorMessage } = useToast();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchProductData();
  }, []);

  const fetchProductData = async () => {
    if (!id) return;
    setIsLoading(true);
    try {
      const data = await getPokemonById(parseInt(id));
      if (!data) return;
      setProduct(data);
      setIsLoading(false);
    } catch (error) {
      errorMessage(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="py-12 w-full h-full">
      {isLoading ? <Loader></Loader> : product ? <ProductSection productData={product} /> : <>No product found</>}
    </div>
  );
};

export default ProductPage;
