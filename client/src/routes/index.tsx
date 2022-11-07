import Cart from '@pages/Cart';
import IndexPage from '@pages/index';
import Page404 from '@pages/Page404';
import Product from '@pages/Product';
import { PathRouteProps, Routes as Switch, Route } from 'react-router-dom';

export enum RouteType {
  PUBLIC,
  PRIVATE,
  RESTRICTED,
}
interface AppRoute extends PathRouteProps {
  type?: RouteType;
}
export const AppRoutes: AppRoute[] = [
  // Public Routes
  {
    type: RouteType.PUBLIC,
    path: 'cart',
    children: <Cart />,
  },
  {
    type: RouteType.PUBLIC,
    path: 'products/:id',
    children: <Product />,
  },
  {
    type: RouteType.PUBLIC,
    path: '',
    children: <IndexPage />,
  },
];

const Routes = () => {
  return (
    <Switch>
      {AppRoutes.map((r) => {
        const { type } = r;
        return <Route key={`${r.path}`} path={`/${r.path}`} element={r.children} />;
      })}
      <Route path="*" element={<Page404 />} />
    </Switch>
  );
};

export default Routes;
