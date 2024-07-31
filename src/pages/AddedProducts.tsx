import { useSelector } from "react-redux";
import { RootState } from "../redux/store/store";

const AddedProducts = () => {
  const addedProducts = useSelector(
    (state: RootState) => state.auth.addProduct
  );
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {addedProducts?.map((product) => {
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
                Category: {product.category}
              </p>
            </div>
            <div className="p-6 pt-0">
              {/* <Button
            notlightning={true}
            navigation={`/courses/${data.id}`}
            className="base-medium btn inline-flex-center text-light800_dark300 h-11 w-full rounded-md px-8 transition-all duration-200 ease-in-out hover:bg-opacity-90"
          >
            Kursga o&apos;tish
          </Button> */}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AddedProducts;
