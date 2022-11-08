import { Product } from '@api/types';

interface Props {
  variantPrice: number;
  productData: Product;
}

const ProductInfo = ({ variantPrice, productData }: Props) => {
  const { title, types } = productData;
  return (
    <div className="flex flex-col gap-4 mb-8 mt-0">
      <h1 className="leading-relaxed font-extrabold text-3xl text-main_dark">{title}</h1>
      <div className="flex flex-row gap-4 items-center justify-start w-full">
        {types.map((type, index) => (
          <div
            key={index}
            style={{ background: type.color }}
            className="text-base text-white rounded-2xl flex items-center justify-center font-semibold"
          >
            <span className="font-semibold text-xs py-[0.15rem] px-[0.85rem]" style={{ letterSpacing: '0.4px' }}>
              {type.name}
            </span>
          </div>
        ))}
      </div>
      <div className="text-xl font-medium">
        <span className=" font-bold text-2xl text-main_dark">${variantPrice}</span>
      </div>
    </div>
  );
};

export default ProductInfo;
