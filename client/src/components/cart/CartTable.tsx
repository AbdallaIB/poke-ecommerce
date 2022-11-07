import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useCartStore, { Cart } from '@lib/stores/cart';

const CartTable = ({ cart }: { cart: Cart[] }) => {
  const { updateCartItemQuantity } = useCartStore();
  const [cartItems, setCartItems] = useState<Cart[]>([]);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    setCartItems(cart);
    setSubtotal(getCartSubTotal(cart));
    console.log(cart);
  }, [cart]);

  const getCartSubTotal = (cart: Cart[]) => {
    if (cart.length === 0) {
      return 0;
    } else {
      let totalPrice = 0;
      cart.forEach((item) => (totalPrice += item.variantQuantity * item.variantPrice));
      return Math.round(totalPrice * 100) / 100;
    }
  };

  const updateItem = (id: number, quantity: number) => {
    updateCartItemQuantity(id, quantity);
  };

  return (
    <div className="min-h-80 max-w-2xl my-4 sm:my-8 mx-auto w-full">
      <table className="mx-auto">
        <thead>
          <tr className="uppercase text-xs sm:text-sm  border-b border-palette-light">
            <th className="font-normal px-6 py-4">Product</th>
            <th className="font-normal px-6 py-4">Quantity</th>
            <th className="font-normal px-6 py-4 hidden sm:table-cell">Price</th>
            <th className="font-normal px-6 py-4">Remove</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-palette-lighter">
          {cartItems.map((item) => (
            <tr key={item.variantId} className="text-sm sm:text-base text-gray-600 text-center">
              <td className="font-medium px-4 sm:px-6 py-4 flex items-center gap-8">
                <img
                  src={item.productImage}
                  height={64}
                  width={64}
                  className={`hidden sm:inline-flex`}
                  alt={item.variantTitle}
                />
                <Link to={`/products/${item.productId}`}>
                  {item.productTitle} - {item.variantTitle}
                </Link>
              </td>
              <td className="font-medium px-4 sm:px-6 py-4">
                <input
                  type="number"
                  inputMode="numeric"
                  id="variant-quantity"
                  name="variant-quantity"
                  min="1"
                  step="1"
                  value={item.variantQuantity}
                  onChange={(e) => updateItem(item.variantId, parseInt(e.target.value))}
                  className="block w-12 h-full py-1 px-2 text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </td>
              <td className="text-base font-light px-4 sm:px-6 py-4 hidden sm:table-cell">
                <span className=" font-bold text-2xl">${item.variantPrice}</span>
              </td>
              <td className="font-medium px-4 sm:px-6 py-4">
                <button aria-label="delete-item" className="" onClick={() => updateItem(item.variantId, 0)}>
                  <i className="bx bx-trash text-2xl"></i>
                </button>
              </td>
            </tr>
          ))}
          {subtotal === 0 ? null : (
            <tr className="text-center">
              <td></td>
              <td className="text-base text-gray-600 font-semibold uppercase px-4 sm:px-6 py-4">Subtotal</td>
              <td className="text-lg  font-medium px-4 sm:px-6 py-4">
                <span className=" font-bold text-2xl">${subtotal}</span>
              </td>
              <td></td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CartTable;
