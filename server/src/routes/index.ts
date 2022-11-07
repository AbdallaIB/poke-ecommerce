import { Router } from 'express';
import defaultRouter from '@routes/default';
import stripeRouter from '@routes/stripe';
import { StripeController } from '@controllers/stripe';

const router = Router();
// Controllers
const stripeController = new StripeController();

// Stripe routes
stripeRouter(router, stripeController);

// Default Routes, This line should be the last line of this module.
defaultRouter(router);

export default router;
