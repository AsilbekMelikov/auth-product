import { useEffect, useState } from "react";
import { Button } from "../../@/components/ui/button";
import axios from "axios";
import { useDispatch } from "react-redux";
import { deleteProduct, getProducts } from "../redux/slice/slice";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store/store";
import AddProduct from "./AddProduct";
import UpdateProduct from "./UpdateProduct";
import Modal from "./shared/Modal";
import { toast } from "../../@/components/ui/use-toast";

interface ProductProps {
  dataSkipNumber: number;
}

const ProductList = ({ dataSkipNumber }: ProductProps) => {
  const [showUpdateForm, setShowUpdateForm] = useState({
    show: false,
    id: 0,
  });
  const productListInfo = useSelector(
    (state: RootState) => state.auth.productList
  );

  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `https://dummyjson.com/products?limit=9&skip=${dataSkipNumber}`
        );
        dispatch(getProducts(data?.products)); // Handle the data as needed
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();

    // eslint-disable-next-line
  }, [dataSkipNumber]);
  const handleClick = async (id: number) => {
    dispatch(deleteProduct(id));
    try {
      const { data } = await axios.delete(
        `https://dummyjson.com/products/${id}`
      );
      console.log(data);
      toast({
        className:
          "bg-success text-white fixed top-0 left-[50%] z-[100] flex max-h-screen w-full translate-x-[-50%] md:max-w-[420px]",
        title: "Muvaffaqiyatli o'chirildi",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <AddProduct />
      <UpdateProduct
        showUpdateForm={showUpdateForm}
        setShowUpdateForm={setShowUpdateForm}
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {productListInfo?.map((product) => {
          return (
            <div
              key={product.id}
              className="light-border bg-white flex flex-col justify-between rounded-lg border shadow-sm"
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                loading="lazy"
                decoding="async"
                className="w-full rounded-t-md object-cover"
                width={100}
                height={100}
              />
              <div className="flex flex-col space-y-2 p-6">
                <h3 className="h3-semibold-24 text-dark200_light800">
                  {product.title}
                </h3>
                <p className="base-medium text-light500_dark600">
                  {product.description}
                </p>
                <p className="paragraph-medium-16 text-dark200_light800 flex flex-wrap items-center gap-2">
                  Brand: {product.brand}
                </p>
              </div>
              <div className="p-6 pt-0 flex justify-between items-center">
                <Button
                  onClick={() => {
                    setShowUpdateForm({
                      show: true,
                      id: product.id,
                    });
                  }}
                  className="bg-bluetifany p-[10px] text-white text-[13px] leading-4 tracking-[0.12px]  rounded-md flex items-center justify-center mr-4 hover:bg-opacity-90 duration-300"
                >
                  Edit qilish
                </Button>
                <Modal
                  funcAction={() => handleClick(product.id)}
                  triggerButtonCont={"O'chirish"}
                  actionButtonCont={"Delete"}
                  otherClasses="bg-red-600 flex items-center justify-center rounded-md text-white"
                />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ProductList;
