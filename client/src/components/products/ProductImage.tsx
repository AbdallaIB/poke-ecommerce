import { PokemonVariants } from '@utils/pokemon';
import { useState, useRef, useEffect } from 'react';

interface Props {
  variantId: number;
  variants: PokemonVariants[];
  onVariantSelected: (id: number) => void;
}
const ProductImage = ({ variants, onVariantSelected, variantId }: Props) => {
  const [mainImg, setMainImg] = useState(variants[0].image);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mainImg = variants.find((variant) => variant.id === variantId)?.image;
    if (mainImg) setMainImg(mainImg);
  }, [variantId]);

  const handleImageChange = (image: string, id: number) => {
    setMainImg(image);
    onVariantSelected(id);
  };

  const scroll = (scrollOffset: number) => {
    if (ref.current) ref.current.scrollLeft += scrollOffset;
  };

  return (
    <div className="w-full md:w-1/2 max-w-md border border-palette-lighter bg-white rounded shadow-lg h-[65vh]">
      <div className="relative flex items-center justify-center h-5/12" style={{ height: '65%' }}>
        <img
          src={mainImg}
          alt={mainImg}
          className="transform duration-500 ease-in-out hover:scale-105 max-h-full max-w-full"
        />
      </div>
      <div className="relative flex border-t border-palette-lighter" style={{ height: '35%' }}>
        <button
          aria-label="left-scroll"
          className="h-32 bg-palette-lighter hover:bg-palette-light absolute left-0 z-10 opacity-75"
          onClick={() => scroll(-300)}
        >
          <i className="bx bx-left-arrow-alt"></i>
        </button>
        <div
          ref={ref}
          style={{ scrollBehavior: 'smooth' }}
          className="flex space-x-1 w-full overflow-auto border-t py-3"
        >
          {variants.map(({ image, title, id }, index) => (
            <button
              key={index}
              className="relative w-40 flex-shrink-0 rounded-sm flex items-center justify-center p-2 h-full"
              onClick={() => handleImageChange(image, id)}
            >
              <img src={image} alt={title} className="h-full w-full max-h-full max-w-full object-contain" />
            </button>
          ))}
        </div>
        <button
          aria-label="right-scroll"
          className="h-32 bg-palette-lighter hover:bg-palette-light absolute right-0 z-10 opacity-75"
          onClick={() => scroll(300)}
        >
          <i className="bx bx-right-arrow-alt"></i>
        </button>
      </div>
    </div>
  );
};

export default ProductImage;
