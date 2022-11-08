import { useEffect, useState } from 'react';
import Button from '@components/shared/button';
import ProductInfo from '@components/products/ProductInfo';
import ProductForm from '@components/products/ProductForm';
import { Link } from 'react-router-dom';
import { Product } from '@api/types';

interface Props {
  variantId: number;
  onVariantSelected: (id: number) => void;
  productData: Product;
}

const ProductDetails = ({ productData, variantId, onVariantSelected }: Props) => {
  const { title, id, price, imageSrc, variants } = productData;
  const [variantPrice, setVariantPrice] = useState(price);

  useEffect(() => {
    setVariantPrice(variants[variantId].price);
  }, [variantId]);
  return (
    <div className="flex flex-col justify-start items-start gap-4 h-full w-full md:w-1/2 max-w-xs mx-auto min-h-128">
      <Link to="/" className="w-full">
        <Button classes="w-full" text="Back To All Products" iconClass="bx bx-arrow-back"></Button>
      </Link>
      <ProductInfo variantPrice={variantPrice} productData={productData} />
      <ProductForm
        variantId={variantId}
        title={title}
        id={id.toString()}
        variants={variants}
        mainImg={imageSrc}
        setVariantId={onVariantSelected}
        setVariantPrice={setVariantPrice}
      />
    </div>
  );
};

export default ProductDetails;
