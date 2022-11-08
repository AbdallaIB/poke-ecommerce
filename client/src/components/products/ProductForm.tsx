import { useEffect, useState } from 'react';
import Button from '@components/shared/button';
import useCartStore from '@lib/stores/cart';
import { PokemonVariants } from '@api/types';

interface Props {
  title: string;
  id: string;
  variants: PokemonVariants[];
  variantId: number;
  setVariantId: (id: number) => void;
  setVariantPrice: (price: number) => void;
  mainImg: string;
}

const ProductForm = ({ title, id, variants, setVariantPrice, mainImg, variantId, setVariantId }: Props) => {
  const [quantity, setQuantity] = useState(1);
  const [variant, setVariant] = useState(variants[0]);
  const { addToCart } = useCartStore();

  const handleSizeChange = (e: string) => {
    setVariantId(parseInt(e));
    // send back size change
    const selectedVariant = variants.filter((v) => v.id === parseInt(e)).pop();
    if (selectedVariant) {
      setVariantPrice(selectedVariant.price);

      // update variant
      setVariant(selectedVariant);
    }
  };

  useEffect(() => {
    setVariant(variants[variantId]);
    console.log(variantId);
  }, [variantId]);

  const handleAddToCart = async () => {
    const varId = variant.id;
    console.log('handleAddToCart', variant);
    // update store context
    addToCart({
      productId: id,
      productTitle: title,
      productImage: variant.image,
      variantId: varId,
      variantPrice: variant.price,
      variantTitle: variant.title,
      variantQuantity: quantity,
    });
  };

  const updateQuantity = (e: string) => {
    setQuantity(e === '' ? 1 : Math.floor(parseInt(e)));
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex justify-start space-x-2 w-full">
        <div className="flex flex-col items-start space-y-1 flex-grow-0">
          <label className="text-gray-500 text-base">Qty.</label>
          <input
            type="number"
            inputMode="numeric"
            id="quantity"
            name="quantity"
            min="1"
            step="1"
            value={quantity}
            onChange={(e) => updateQuantity(e.target.value)}
            className="block w-12 h-full py-1 px-2 text-sm text-gray-900 bg-white rounded-lg border border-main focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col items-start space-y-1 flex-grow">
          <label className="text-gray-500 text-base">Type</label>
          <select
            id="size-selector"
            name="size-selector"
            onChange={(event) => handleSizeChange(event.target.value)}
            value={variantId}
            className="inline-flex w-full items-center text-gray-500 bg-white border border-main focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            {variants.map((item) => (
              <option
                className="ml-2 w-full text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                id={item.id.toString()}
                key={item.id}
                value={item.id}
              >
                {item.title}
              </option>
            ))}
          </select>
        </div>
      </div>
      <Button text="Add To Cart" onClick={handleAddToCart} iconClass="bx bx-cart-alt text-2xl" isPrimary></Button>
    </div>
  );
};

export default ProductForm;
