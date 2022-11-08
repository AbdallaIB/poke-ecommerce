import useCartStore from '@lib/stores/cart';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from '@assets/logo.svg';

const Nav = () => {
  const { cart } = useCartStore();
  const [cartItems, setCartItems] = useState(0);

  useEffect(() => {
    let numItems = 0;
    console.log(cart);
    const uniqueItems = new Map();
    cart.forEach((item) => {
      // count items based on unique variantIds
      const uniqueId = `${item.productId}-${item.variantId}`;
      if (!uniqueItems.get(uniqueId)) {
        uniqueItems.set(uniqueId, 1);
        numItems += 1;
      } else {
        uniqueItems.set(uniqueId, uniqueItems.get(uniqueId) + 1);
      }
    });
    console.log(numItems, uniqueItems);
    setCartItems(numItems);
  }, [cart]);

  return (
    <header className="border-b border-palette-lighter w-full bg-white">
      <div className="flex flex-row items-center justify-between mx-auto max-w-6xl px-6 pb-2 pt-3">
        <Link to="/" className=" cursor-pointer">
          <div className="flex no-underline items-center gap-1">
            <img src={Logo} alt="logo" className="h-6 w-6 mt-[0.15rem]" />
            <div className="text-xl font-primary font-semibold tracking-tight h-full flex items-center">
              Poke-commerce
            </div>
          </div>
        </Link>
        <div>
          <Link to="/cart" className="relative" aria-label="cart">
            <i className="bx bx-cart-alt text-2xl text-main"></i>
            {cartItems === 0 ? null : (
              <div className="absolute top-0 right-0 text-xs bg-main text-white font-semibold rounded-full h-4 w-4 flex items-center justify-center transform translate-x-3 -translate-y-3">
                {cartItems}
              </div>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Nav;
