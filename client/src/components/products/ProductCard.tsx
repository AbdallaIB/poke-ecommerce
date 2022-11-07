import { Product } from '@api/types';
import { Link } from 'react-router-dom';

interface Props {
  product: Product;
}
const ProductCard = ({ product }: Props) => {
  const { title, types, price, imageSrc, id, statAttack, statDefense, statSpeed, healthPoints, themeColor } = product;

  return (
    <Link to={`/products/${id}`} className="h-120 w-72 rounded shadow-lg mx-auto border relative bg-white">
      <div className="flex flex-col w-full">
        <div
          className="flex absolute h-full w-full top-0"
          style={{ background: `radial-gradient(circle at 50% 0%, ${themeColor} 36%, transparent 36%)` }}
        ></div>
        <div className="flex items-center absolute text-md rounded-full py-[0.15rem] px-[0.75rem] top-2 right-2 gap-[0.15rem] z-10 shadow bg-white">
          <p className="font-bold text-xs pt-[3px]" style={{ letterSpacing: '0.4px' }}>
            HP{' '}
          </p>
          {healthPoints}
        </div>
        <div className="h-48 mt-6 w-full relative">
          <img
            onError={() => {}}
            src={imageSrc}
            alt={title}
            className="transform duration-500 ease-in-out hover:scale-110 h-full w-full"
          />
        </div>
        <div className="text-2xl my-4 px-4 font-semibold text-center">{title}</div>
        <div className="flex flex-row gap-4 items-center justify-center w-full">
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
        <div className="w-full flex flex-row gap-10 mt-4 justify-center items-center">
          <div className="flex flex-col items-center justify-center">
            <span className="font-bold">{statAttack}</span>
            <span className="text-gray-600">Attack</span>
          </div>
          <div className="flex flex-col items-center justify-center">
            <span className="font-bold">{statDefense}</span>
            <span className="text-gray-600">Defense</span>
          </div>
          <div className="flex flex-col items-center justify-center">
            <span className="font-bold">{statSpeed}</span>
            <span className="text-gray-600">Speed</span>
          </div>
        </div>
        <div className="font-medium text-base mb-4 pl-8 pr-4 pb-1 pt-2">
          <div>
            <span className=" font-bold text-2xl">${price}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
