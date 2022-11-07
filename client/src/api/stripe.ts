import { apiRequest } from '@api/index';
import { Cart } from '@lib/stores/cart';

const baseUrl = process.env.BASE_API_URL || '';

export const createCheckoutSession = async (items: Cart[]) => {
  return apiRequest<Cart[], { url: string }>(baseUrl, 'post', 'create-checkout-session', {}, items);
};
