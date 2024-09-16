import withLoadingIndicator from '../../HOCS/withLoadingIndicator';
import useProducts from '../../hooks/useProducts';
import ProductCreateForm from './ProductCreateForm'

const ProductCreatePage = () => {
  const { loading } = useProducts();
  const EnhancedProductForm = withLoadingIndicator(ProductCreateForm);
  return (
    <div>
      <EnhancedProductForm isLoading={loading} />
    </div>
  )
}

export default ProductCreatePage