import { SubmitHandler, useForm } from "react-hook-form";
import { Product } from "../../types/productType";
import { yupResolver } from "@hookform/resolvers/yup";
import { productSchema } from "../../yup";
import FormUpload from "../../components/Form/FormUpload";
import FormText from "../../components/Form/FormText";
import FormNumber from "../../components/Form/FormNumber";
import FormEditor from "../../components/Form/FormEditor";
import { useAppDispatch } from "../../store/hooks";
import { createProductError, createProductSuccess } from "../../features/product/productSlice";
import { HttpError } from "../../types/httpType";
import FormTag from "../../components/Form/FormTag";
import useProducts from "../../hooks/useProducts";

const defaultValues = {
  id: "",
  title: "",
  description: "",
  price: 0,
  media: [],
  tags: [],
  productType: "",
};

const ProductCreateForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<Product>({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(productSchema),
  });
  const { createProduct } = useProducts();
  const dispatch = useAppDispatch();
  const onSubmit: SubmitHandler<Product> = (data) => {
    try {
      const product = {
        ...data,
        id: Math.random().toString(36),
      }
      createProduct(product);

      dispatch(createProductSuccess(product));
    } catch (error: HttpError | any) {
      dispatch(createProductError(error?.message));
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 p-4 border-2 border-gray-200 rounded-md"
    >
       <div>
        <FormUpload
          label="Upload Image"
          required
          name="media"
          control={control}
          setValue={setValue}
          errorMessage={errors?.media && errors?.media?.message}
        />
      </div>
      <div>
        <FormText
          name="title"
          control={control}
          setValue={setValue}
          errorMessage={errors?.title && errors?.title?.message}
          label="Title"
          required
        />
      </div>
      <div>
        <FormNumber
          name="price"
          control={control}
          setValue={setValue}
          errorMessage={errors?.price && errors?.price?.message}
          label="Price"
          required
        />
      </div>

      <div>
        <FormEditor
          label="Description"
          name="description"
          control={control}
          setValue={setValue}
          required
          errorMessage={errors?.description && errors?.description?.message}
        />
      </div>

      <div>
        <FormText
          name="productType"
          control={control}
          setValue={setValue}
          label="Product Type"
        />
      </div>
      
      <div>
        <FormTag
          name="tags"
          control={control}
          setValue={setValue}
          label="Tag"
          placeholder="Create tag split by '|'. Examples: Tag 1 | Tag 2 | Tag 3"
        />
      </div>
     
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Tạo mới
      </button>
    </form>
  );
};

export default ProductCreateForm;
