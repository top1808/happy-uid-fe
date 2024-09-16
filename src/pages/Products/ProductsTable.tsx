import React from 'react'
import { Product } from '../../types/productType'
import { formatVND } from '../../utils/functionHelpers';

interface ProductsTable {
    data?: Product[] | null;
    error?: string | null;
}

const ProductsTable: React.FC<ProductsTable> = ({ data, error }) => {
  return (
    <table className="table-auto w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2">Media</th>
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Product Type</th>
            <th className="px-4 py-2">Tags</th>
          </tr>
        </thead>
        <tbody>
          {error && <tr><td colSpan={5}>{error}</td></tr>}
          {data && data.map((product) => (
            <tr key={product.id}>
              <td className="px-4 py-2 text-center flex justify-center">
                <img src={product?.media?.[0]} className="w-20 h-auto" alt={product.title} />
              </td>
              <td className="px-4 py-2 text-center">{product.title.slice(0, 50)}</td>
              <td className="px-4 py-2 text-center">{formatVND(product.price)}</td>
              <td className="px-4 py-2 text-center">{product.productType}</td>
              <td className="px-4 py-2">
                <div className='flex gap-2 justify-center flex-wrap'>

                {
                product?.tags?.map((tag) => <span key={tag} className='p-1 px-6 text-sm bg-gray-100 rounded'>{tag}</span>)}
                </div>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
  )
}

export default ProductsTable