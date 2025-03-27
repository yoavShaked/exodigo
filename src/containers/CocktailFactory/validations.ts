import * as Yup from "yup";

export const validationSchema = Yup.object({
  category: Yup.string().required("Category is required"),
  glass: Yup.string().required("Glass is required"),
  instructions: Yup.string().required("Instructions is required"),
  recipy: Yup.array()
    .required("Recipy is required. Please fill all recipy")
    .of(
      Yup.object().shape({
        ingredient: Yup.string().required(),
        measure: Yup.string().required(),
      })
    )
    .min(1),
});
