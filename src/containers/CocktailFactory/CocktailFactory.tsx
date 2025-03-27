import React from "react";
import { useFormik } from "formik";
import { Input, DynamicInputsList, TextArea } from "../../components/FormInput";
import { Button } from "../../components/Button";
import { ErrorMessage } from "../../components/ErrorMessage";
import { FormValues } from "./types";
import { validationSchema } from "./validations";
import "./index.css";

const initialValues: FormValues = {
  category: "",
  name: "",
  glass: "",
  instructions: "",
  recipy: [{ ingredient: "", measure: "" }],
  image: null,
};

interface Props {
  readonly onSubmit: (values: FormValues) => void;
}

export const CocktailFactory = React.memo(({ onSubmit }: Props) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <form className="cocktail-factory" onSubmit={formik.handleSubmit}>
      <div className="form-elements">
        <div>
          <Input
            key={"name"}
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="name"
          />
          {formik.errors.name && (
            <ErrorMessage>{formik.errors.name}</ErrorMessage>
          )}
        </div>
        <div>
          <Input
            value={formik.values.category}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="category"
            key={"category"}
          />
          {formik.errors.category && (
            <ErrorMessage>{formik.errors.category}</ErrorMessage>
          )}
        </div>
        <div>
          <Input
            value={formik.values.glass}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="glass"
            key="glass"
          />
          {formik.errors.glass && (
            <ErrorMessage>{formik.errors.glass}</ErrorMessage>
          )}
        </div>
        <div>
          <TextArea
            value={formik.values.instructions}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="instructions"
            key={"instructions"}
          />
          {formik.errors.instructions && (
            <ErrorMessage>{formik.errors.instructions}</ErrorMessage>
          )}
        </div>
        <div>
          <DynamicInputsList
            values={formik.values.recipy}
            keys={["measure", "ingredient"]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            baseKey="recipy"
          />
          {formik.errors.recipy && (
            <ErrorMessage>Fill all recipy fields</ErrorMessage>
          )}
        </div>
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
});
