import { useEffect, useState } from "react";
import { Button } from "../../@/components/ui/button";
import axios from "axios";
import { useDispatch } from "react-redux";
import { deleteProduct, getProducts } from "../redux/slice/slice";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store/store";
import AddProduct from "./AddProduct";
import UpdateProduct from "./UpdateProduct";

const ProductList = () => {
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
        const { data } = await axios.get("https://dummyjson.com/products");
        dispatch(getProducts(data?.products)); // Handle the data as needed
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();

    // eslint-disable-next-line
  }, []);
  const handleClick = async (id: number) => {
    dispatch(deleteProduct(id));
    try {
      const { data } = await axios.delete(
        `https://dummyjson.com/products/${id}`
      );
      console.log(data);
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
              className="light-border background-light900_dark500 flex flex-col justify-between rounded-lg border shadow-sm"
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
                <Button
                  onClick={() => handleClick(product.id)}
                  className="bg-red-600 p-[10px] text-white text-[13px] leading-4 tracking-[0.12px]  rounded-md flex items-center justify-center mr-4 hover:bg-opacity-90 duration-300"
                >
                  O'chirish
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ProductList;
