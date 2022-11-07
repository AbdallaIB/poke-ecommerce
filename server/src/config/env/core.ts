import * as path from 'path';

const rootPath = path.normalize(`${__dirname}/../../..`);

export const core = {
  root: rootPath,
  node_env: process.env.NODE_ENV,
  react_client_origin: process.env.REACT_CLIENT_ORIGIN,
  stripe_private_key: process.env.STRIPE_PRIVATE_KEY,
};
