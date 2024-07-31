import FormInput from "./shared/FormInput";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { ToastAction } from "@radix-ui/react-toast";
import { toast } from "../../@/components/ui/use-toast";
import { updateProduct, updateRequestProduct } from "../redux/slice/slice";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store/store";
import { Button } from "../../@/components/ui/button";
import { Dispatch, SetStateAction } from "react";

interface Props {
  show: boolean;
  id: number;
}
interface ComponentProps {
  showUpdateForm: Props;
  setShowUpdateForm: Dispatch<SetStateAction<Props>>;
}

const UpdateProduct = ({
  showUpdateForm,
  setShowUpdateForm,
}: ComponentProps) => {
  const loading = useSelector(
    (state: RootState) => state.auth.updateProductLoading
  );
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: { title: "", description: "", category: "", price: "" },
    validationSchema: Yup.object().shape({
      title: Yup.string().min(3, "Title kiriting").optional(),
      description: Yup.string().min(8, "Qisqacha tariflang").optional(),
      category: Yup.string().min(2, "kategoriya kiriting").optional(),
      price: Yup.number().optional(),
    }),
    validateOnChange: true,
    onSubmit: async (values, { resetForm }) => {
      try {
        dispatch(updateRequestProduct());
        const { data } = await axios.put(
          `https://dummyjson.com/products/${showUpdateForm.id}`,
          {
            title: values.title,
            description: values.description,
            category: values.category,
            price: values.price,
            thumbnail:
              "https://cdn.dummyjson.com/products/images/beauty/Powder%20Canister/thumbnail.png",
          }
        );
        dispatch(updateProduct(data));
        resetForm();
        setShowUpdateForm({ ...showUpdateForm, show: false });
      } catch (error) {
        console.log(error);
        toast({
          className: "",
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
    },
  });

  return (
    <>
      <div
        className={`${
          showUpdateForm.show
            ? "visible translate-x-0 overflow-y-auto"
            : "invisible translate-x-full"
        } fixed z-[60] overflow-x-hidden top-[90px] right-0 drop-shadow-md duration-200 bg-white w-[278px] h-[90vh] rounded-l-[8px] py-6`}
      >
        <h2 className="pb-4 px-[13px] mb-[24px] border-b border-grayThird text-[24px] leading-6 text-left text-black">
          Update produkt
        </h2>

        <form onSubmit={formik.handleSubmit}>
          <FormInput
            labelValue={"Produkt nomi"}
            type={"text"}
            name={"title"}
            inputValue={formik.values.title}
            inputPlaceholder={"Enter title"}
            onChange={formik.handleChange}
            validationError={formik.errors}
            validationTouch={formik.touched}
            required
          />
          <FormInput
            labelValue={"Produkt description"}
            type={"text"}
            name={"description"}
            inputValue={formik.values.description}
            inputPlaceholder={"Enter description"}
            onChange={formik.handleChange}
            validationError={formik.errors}
            validationTouch={formik.touched}
            required
          />
          <FormInput
            labelValue={"Produkt kategory"}
            type={"text"}
            name={"category"}
            inputValue={formik.values.category}
            inputPlaceholder={"Enter category"}
            onChange={formik.handleChange}
            validationError={formik.errors}
            validationTouch={formik.touched}
            required
          />
          <FormInput
            labelValue={"Produkt narxi"}
            type={"text"}
            name={"price"}
            inputValue={formik.values.price}
            inputPlaceholder={"Enter price"}
            onChange={formik.handleChange}
            validationError={formik.errors}
            validationTouch={formik.touched}
            required
          />

          {/* button */}
          <div className="px-[13px]">
            <Button
              type="submit"
              className="relative w-full px-[10px] text-[13px] leading-4 tracking-[0.12px]  bg-bluetifany rounded-[7px] text-white duration-200 hover:opacity-85 disabled:opacity-75"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="absolute left-[10%] top-[30%] w-[16px] h-[16px] rounded-[50%] border-[3px] border-solid border-loadingColor border-t-[3px] border-t-white animate-loader"></span>
                  <span className="ml-[12px] text-[13px] leading-4 tracking-[0.12px]">
                    Processing...
                  </span>
                </>
              ) : (
                "Update"
              )}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateProduct;
