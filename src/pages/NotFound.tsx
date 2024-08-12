import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="relative">
      <div className="w-full text-center">
        <div className="relative h-[200px] flex">
          <h1 className="text-[236px] font-extralight m-0 uppercase text-[#211b19] absolute left-[50%] translate-x-[-50%] top-[-50%]">
            Oops!
          </h1>
          <h2 className="text-[28px] font-normal uppercase text-[#211b19] bg-white px-2.5 py-1 m-auto inline-block absolute bottom-0 left-[50%] translate-x-[-50%]">
            404 - The Page can't be found
          </h2>
        </div>
        <Link
          to="/"
          className="mt-8 inline-block font-bold text-white uppercase px-3 py-4 bg-[#ff6300] text-[18px] transition-all duration-200 hover:text[#ff6300] hover:bg-[#211b19]"
        >
          Go TO Homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
