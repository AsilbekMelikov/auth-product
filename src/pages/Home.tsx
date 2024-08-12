import { useEffect, useState } from "react";
import ProductList from "../components/ProductList";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import axios from "axios";
import { Button } from "@/components/ui/button";

const Home = () => {
  const [dataSkipNumber, setDataSkipNumber] = useState(0);
  const [allProductLength, setAllProductLength] = useState<number>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `https://dummyjson.com/products?limit=0`
        );
        setAllProductLength(Math.ceil(data.products.length / 9));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();

    // eslint-disable-next-line
  }, []);

  const productsArray = [...Array(allProductLength).keys()];
  const firstSlicedProducts =
    dataSkipNumber >= 17
      ? [17, 18]
      : productsArray.slice(dataSkipNumber, dataSkipNumber + 3);
  const firstAndLastProducts = firstSlicedProducts.concat(
    productsArray.slice(allProductLength! - 3, allProductLength!)
  );

  return (
    <div className="flex flex-col gap-5">
      <Pagination>
        <PaginationContent>
          <Button
            onClick={() => setDataSkipNumber((prev) => prev - 1)}
            disabled={dataSkipNumber === 0}
          >
            <PaginationPrevious className="bg-white rounded-md cursor-pointer hover:bg-bluetifany duration-200 hover:text-white transition-all select-none disabled:bg-white/70" />
          </Button>
          {dataSkipNumber > 1 && (
            <>
              <PaginationItem onClick={() => setDataSkipNumber(0)}>
                <PaginationLink
                  className={`bg-white rounded-md cursor-pointer hover:bg-bluetifany duration-200 hover:text-white transition-all select-none`}
                >
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            </>
          )}
          {firstAndLastProducts.map((item, index) => {
            return (
              <div key={index} className="flex">
                <PaginationItem onClick={() => setDataSkipNumber(item)}>
                  <PaginationLink
                    className={` rounded-md cursor-pointer hover:bg-bluetifany duration-200 hover:text-white transition-all select-none ${
                      dataSkipNumber === item
                        ? "bg-bluetifany text-white"
                        : "bg-white text-black"
                    }`}
                  >
                    {item + 1}
                  </PaginationLink>
                </PaginationItem>
                {index === 2 && item < 18 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}
              </div>
            );
          })}

          <Button
            onClick={() => setDataSkipNumber((prev) => prev + 1)}
            disabled={dataSkipNumber === allProductLength! - 1}
          >
            <PaginationNext className="cursor-pointer bg-white rounded-md hover:bg-bluetifany duration-200 hover:text-white transition-all select-none disabled:bg-white/70" />
          </Button>
        </PaginationContent>
      </Pagination>
      <ProductList dataSkipNumber={dataSkipNumber} />
    </div>
  );
};

export default Home;
