import useCartStore from '@lib/stores/cart';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  const { getCart, cart } = useCartStore();
  const [cartItems, setCartItems] = useState(0);

  useEffect(() => {
    let numItems = 0;
    const cartItems = getCart();
    console.log(cartItems);
    const uniqueVariantIds = new Set(cartItems.map((item) => item.variantId));
    cartItems.forEach((item) => {
      // count items based on unique variantId
      if (!uniqueVariantIds.has(item.variantId)) {
        numItems += item.variantQuantity;
        uniqueVariantIds.add(item.variantId);
      }
    });
    setCartItems(numItems);
  }, [cart]);

  return (
    <header className="border-b border-palette-lighter w-4/5 bg-white">
      <div className="flex flex-row items-center justify-between mx-auto max-w-6xl px-6 pb-2 pt-3">
        <Link to="/" className=" cursor-pointer">
          <h1 className="flex no-underline">
            <i className="bx bx-ghost text-2xl"></i>
            <span className="text-xl font-primary font-bold tracking-tight pt-1">{'Pokem-ecom'}</span>
          </h1>
        </Link>
        <div>
          <Link to="/cart" className="relative" aria-label="cart">
            <i className="bx bx-cart-alt text-2xl"></i>
            {cartItems === 0 ? null : (
              <div className="absolute top-0 right-0 text-xs bg-yellow-300 text-gray-900 font-semibold rounded-full py-1 px-2 transform translate-x-10 -translate-y-3">
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
