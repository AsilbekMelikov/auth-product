import loginLogo from "/assets/loginLogo.png";
import loginLogo2x from "/assets/loginLogo@2x.png";
import { Button } from "../../../@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import FormInput from "../../components/shared/FormInput";
import axios from "axios";
import { useDispatch } from "react-redux";
import { request, success } from "../../redux/slice/slice";
import { ToastAction } from "@radix-ui/react-toast";
import { toast } from "../../../@/components/ui/use-toast";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: { username: "", password: "" },
    validationSchema: Yup.object().shape({
      username: Yup.string()
        .min(3, "Kamida 3 ta bo'lsin")
        .required("Username kiriting"),
      password: Yup.string()
        .min(8, "Parol kamida 8 ta belgidan iborat bo'lishi kerak")
        .matches(/[a-zA-Zа-яА-я]/, "Parolda kamida bir harf bo'lishi kerak")
        .required("Parolni kiriting"),
    }),
    validateOnChange: true,
    onSubmit: async (values, { resetForm }) => {
      try {
        dispatch(request());
        const { data } = await axios.post("https://dummyjson.com/auth/login", {
          username: values.username,
          password: values.password,
        });
        dispatch(success(data));
        localStorage.setItem("accessToken", data.token);
        localStorage.setItem("refreshToken", data.refreshToken);
        resetForm();
        navigate("/");
      } catch (error) {
        console.log(error);
        toast({
          className:
            "bg-red-600 text-white fixed top-0 left-[50%] z-[100] flex max-h-screen w-full translate-x-[-50%] md:max-w-[420px]",
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
    },
  });

  return (
    <div className="flex items-center justify-center w-full h-screen gap-12 p-10">
      <div className="bg-white rounded-2xl shadow px-10 py-12 w-[380px] h-[484px] max-md:px-4 max-md:py-6 flex items-center">
        <div className="w-full flex flex-col">
          <h2 className="block text-[32px] font-semibold leading-[38.19px] mb-6 px-4">
            Login
          </h2>
          <form onSubmit={formik.handleSubmit}>
            <FormInput
              labelValue="Username"
              type={"text"}
              name={"username"}
              inputValue={formik.values.username}
              inputPlaceholder={"Username"}
              onChange={formik.handleChange}
              validationError={formik.errors}
              validationTouch={formik.touched}
              required
            />
            <FormInput
              labelValue="Password"
              type={"text"}
              name={"password"}
              inputValue={formik.values.password}
              inputPlaceholder={"Password"}
              onChange={formik.handleChange}
              validationError={formik.errors}
              validationTouch={formik.touched}
              required
            />

            <div className="mt-8 px-4">
              <Button
                type="submit"
                className="w-full mb-9 bg-bluetifany hover:bg-opacity-80 text-4 leading-[19.09px] font-medium text-white text-center rounded-lg duration-300 focus:ring-2 focus:outline-none"
              >
                Login
              </Button>
            </div>
          </form>
        </div>
      </div>
      <div className="bg-white rounded-[68px] w-[592px] h-[650px] items-center justify-center hidden sm:flex">
        <picture>
          <source
            srcSet={`/assets/md-logo.png 1x, /assets/md-logo2x.png 2x`}
            media="(max-width: 680px)"
          />
          <img
            src={loginLogo}
            alt="Login logo"
            width="267"
            height="235"
            loading="lazy"
            srcSet={`${loginLogo} 1x, ${loginLogo2x} 2x`}
          />
        </picture>
      </div>
    </div>
  );
};

export default LoginPage;
