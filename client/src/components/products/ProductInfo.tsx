import { Product } from '@api/types';

const ProductInfo = (product: Product) => {
  const { title, types, price } = product;
  return (
    <div className="font-primary">
      <h1 className="leading-relaxed font-extrabold text-3xl py-2 sm:py-4">{title}</h1>
      <div className="flex flex-row gap-4 items-center justify-start w-full">
        {types.map((type, index) => (
          <div
            key={index}
            style={{ background: type.color, padding: '0.15rem 0.65rem' }}
            className="text-sm text-white rounded-2xl flex items-center justify-center font-semibold"
          >
            <span>{type.name}</span>
          </div>
        ))}
      </div>
      <div className="text-xl font-medium py-4 px-1">
        <span className=" font-bold text-2xl">${price}</span>
      </div>
    </div>
  );
};

export default ProductInfo;
