import { useEffect, useState } from 'react';
import withLoadingIndicator from '../../HOCS/withLoadingIndicator'
import MultiSelect from '../../components/MultiSelect/MultiSelect';
import useProducts from '../../hooks/useProducts'
import ProductsTable from './ProductsTable'
import { OptionFilter } from '../../types/selectType';
import { MultiValue } from 'react-select';
import { Product } from '../../types/productType';

const ProductsPage = () => {
  const { products, error, loading, filterProducts, getAllTags } = useProducts();

  const [productList, setProductList] = useState<Product[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<OptionFilter[]>([]);

  const handleChange = (selected: MultiValue<OptionFilter>) => {
    setSelectedOptions([...(selected || [])]);
    setProductList(filterProducts(selected?.map((option): string => option?.value || "") || []) || []);
  };

  useEffect(() => {
    setProductList(products || []);
  }, [products]);

  const EnhancedComponent = withLoadingIndicator(ProductsTable);
  return (
    <div>
      <div className='m-4'>
        <p className='font-bold'>Filter by tags</p>
        <MultiSelect
          options={getAllTags()?.map((tag) => ({ value: tag, label: tag })) || []}
          value={selectedOptions}
          onChange={handleChange}
        />
      </div>
      <EnhancedComponent data={productList} error={error} isLoading={loading} />
    </div>
  )
}

export default ProductsPage