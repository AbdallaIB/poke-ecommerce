import { createCheckoutSession } from '@api/stripe';
import CartTable from '@components/cart/CartTable';
import Button from '@components/shared/button';
import useToast from '@lib/hooks/useToast';
import useCartStore from '@lib/stores/cart';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { errorMessage } = useToast();
  const { getCart } = useCartStore();

  const handleCheckout = async () => {
    const cart = getCart();
    if (!cart || cart.length === 0) return;
    try {
      const checkoutSession = await createCheckoutSession(cart);
      window.location.href = checkoutSession.url;
    } catch (error) {
      errorMessage(error);
    }
  };

  return (
    <div className="flex flex-col w-full h-full">
      <h1 className="leading-relaxed font-primary font-extrabold text-4xl text-center text-palette-primary mt-4 py-2 sm:py-4">
        Your Cart
      </h1>
      <CartTable cart={getCart()}></CartTable>
      <div className="flex flex-col w-full items-center justify-center gap-4 px-2">
        <Button
          onClick={handleCheckout}
          classes="p-2"
          style={{ width: '20vw', padding: '0.5rem' }}
          text="Checkout"
          isPrimary
        />
        <Link to="/" style={{ width: '20vw' }}>
          <Button classes="w-full" text="Back To All Products" iconClass="bx bx-arrow-back"></Button>
        </Link>
      </div>
    </div>
  );
};

export default Cart;
