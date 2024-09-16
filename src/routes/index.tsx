import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/Home/HomePage';
import ProductCreatePage from '../pages/ProductCreate/ProductCreatePage';
import ProductsPage from '../pages/Products/ProductsPage';
import NotFoundPage from '../pages/NotFound/NotFoundPage';
import Layout from '../layout';
import { ROUTES } from '../utils/constants';

const AppRoutes = () => (
    <Router>
      <Routes>
        <Route path={ROUTES.HOME} element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path={ROUTES.PRODUCTS} element={<ProductsPage />} />
          <Route path={ROUTES.CREATE_PRODUCT} element={<ProductCreatePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
)

export default AppRoutes;
