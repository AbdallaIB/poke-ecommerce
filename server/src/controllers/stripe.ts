import loggerHandler from '@utils/logger';
const moduleName = '[stripe] ';
const logger = loggerHandler(moduleName);
import { Request, Response } from 'express';
import { statusCodes } from '@utils/constants';
import Stripe from 'stripe';
import { config } from '@config/config';
const stripe = new Stripe(config.stripe_private_key, { apiVersion: null });

type Cart = {
  productId: string;
  productTitle: string;
  productImage: string;
  variantId: number;
  variantTitle: string;
  variantPrice: number;
  variantQuantity: number;
};

export class StripeController {
  public async createCheckoutSession(req: Request, res: Response) {
    logger.info('[createCheckoutSession][body]', req.body);
    const items = req.body as Cart[];
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: items.map((item) => {
          return {
            price_data: {
              currency: 'usd',
              product_data: {
                name: item.productTitle,
                images: [item.productImage],
              },
              unit_amount: item.variantPrice * 100,
            },
            quantity: item.variantQuantity,
          };
        }),
        success_url: `${config.react_client_origin}/cart`,
        cancel_url: `${config.react_client_origin}/cart`,
      });
      return res.status(statusCodes.OK).json({ url: session.url });
    } catch (error) {
      logger.error('[createCheckoutSession][err]', error.message);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
  }
}
