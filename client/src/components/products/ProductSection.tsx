import ProductDetails from '@components/products/ProductDetails';
import ProductImage from '@components/products/ProductImage';
import { Product } from '@api/types';
import { useState } from 'react';

const ProductSection = ({ productData }: { productData: Product }) => {
  const [variantId, setVariantId] = useState(productData.variants[0].id);
  return (
    <div className="flex flex-col h-3/4 justify-center items-center md:flex-row md:items-start space-y-8 md:space-y-0 md:space-x-4 lg:space-x-8 max-w-6xl w-11/12 mx-auto">
      <ProductImage
        variants={productData.variants}
        variantId={variantId}
        onVariantSelected={(id: number) => setVariantId(id)}
      />
      <ProductDetails
        productData={productData}
        onVariantSelected={(id: number) => setVariantId(id)}
        variantId={variantId}
      />
    </div>
  );
};

export default ProductSection;
