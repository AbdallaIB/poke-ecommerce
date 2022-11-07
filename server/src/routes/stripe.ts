import { StripeController } from '@controllers/stripe';
import { Router } from 'express';

const index = (router: Router, stripeController: StripeController) => {
  // Create checkout session
  router.post('/create-checkout-session', stripeController.createCheckoutSession);
};

export default index;
