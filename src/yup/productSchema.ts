import * as yup from "yup";

export const productSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  price: yup
    .number()
    .positive("Price must be a positive number")
    .required("Price is required"),
  description: yup
    .string()
    .test('not-empty', 'Description is required', (value) => {
      if (value === null || value === undefined || value === '<p class="editor-paragraph"><br></p>') return false;
      return true;
    }),
  media: yup
    .array()
    .min(1, "Cần chọn ít nhất 1 ảnh")
    .max(6, "Không được chọn quá 6 ảnh"),
  tags: yup.array().optional(),
  productType: yup.string().optional(),
});
