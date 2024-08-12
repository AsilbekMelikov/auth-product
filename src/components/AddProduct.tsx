import FormInput from "./shared/FormInput";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { ToastAction } from "@radix-ui/react-toast";
import { toast } from "../../@/components/ui/use-toast";
import {
  addProduct,
  addRequestProduct,
  setShowProductForm,
} from "../redux/slice/slice";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store/store";
import { Button } from "../../@/components/ui/button";
import { useEffect } from "react";

const AddProduct = () => {
  const loading = useSelector(
    (state: RootState) => state.auth.addProductLoading
  );
  const showForm = useSelector(
    (state: RootState) => state.auth.showProductForm
  );
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: { title: "", description: "", category: "", price: "" },
    validationSchema: Yup.object().shape({
      title: Yup.string().min(3, "Title kiriting").required("Title kiriting"),
      description: Yup.string()
        .min(8, "Qisqacha tariflang")
        .required("Bu maydon to'ldirilishi shart"),
      category: Yup.string()
        .min(2, "kategoriya kiriting")
        .required("bu maydon required"),
      price: Yup.number().required("bu maydon required"),
    }),
    validateOnChange: true,
    onSubmit: async (values, { resetForm }) => {
      try {
        dispatch(addRequestProduct());
        const { data } = await axios.post(
          "https://dummyjson.com/products/add",
          {
            title: values.title,
            description: values.description,
            category: values.category,
            price: values.price,
            thumbnail:
              "https://cdn.dummyjson.com/products/images/beauty/Powder%20Canister/thumbnail.png",
          }
        );
        dispatch(addProduct(data));
        resetForm();
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

  useEffect(() => {
    if (showForm) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [showForm]);

  return (
    <>
      {showForm && (
        <div
          onClick={() => dispatch(setShowProductForm())}
          className="fixed left-0 top-0 w-full h-full bg-black/70 z-[999]"
        ></div>
      )}
      <div
        className={`${
          showForm
            ? "visible translate-x-0 overflow-y-auto"
            : "invisible translate-x-full"
        } fixed z-[1000] overflow-x-hidden top-0 right-0 drop-shadow-md duration-200 bg-white w-[278px] h-[100vh] rounded-l-[8px] py-6`}
      >
        <h2 className="pb-4 px-[13px] mb-[24px] border-b border-grayThird text-[24px] leading-6 text-left text-black">
          Produkt qo'shish
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
          <div className="px-3">
            <Button
              type="submit"
              className="relative w-full px-[10px] text-[13px] leading-4 tracking-[0.12px]  bg-bluetifany rounded-lg text-white duration-200 hover:opacity-85 disabled:opacity-75"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="absolute left-[10%] top-[30%] w-4 h-4 rounded-[50%] border-[3px] border-solid border-loadingColor border-t-[3px] border-t-white animate-loader"></span>
                  <span className="ml-[12px] text-[13px] leading-4 tracking-[0.12px]">
                    Processing...
                  </span>
                </>
              ) : (
                "Yaratish"
              )}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddProduct;
