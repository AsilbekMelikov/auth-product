import { Link } from "react-router-dom";
import GlobalSearch from "./GlobalSearch";
import { Button } from "../../../@/components/ui/button";
import { setLogOut, setShowProductForm } from "../../redux/slice/slice";
import Modal from "./Modal";
import { useDispatch } from "react-redux";

const Navbar = () => {
  const dispatch = useDispatch();
  return (
    <>
      <nav className="justify-between items-center flex bg-white fixed z-50 w-full gap-5 p-6 shadow-light-300 dark:shadow-none sm:px-12">
        <Link to="/" className="flex items-center gap-1">
          <img
            src="/assets/site-logo.svg"
            width={23}
            height={23}
            alt="Stackflow"
          />
          <p className="text-[25px] max-sm:hidden">
            Product<span className="text-primary-500">Website</span>
          </p>
        </Link>

        <GlobalSearch />
        <Link to="/added-products" className="flex items-center gap-1">
          <p className="text-[25px] max-sm:hidden hover:underline">
            My products
          </p>
        </Link>
        <div className="flex items-center">
          <Button
            onClick={() => dispatch(setShowProductForm())}
            className="bg-bluetifany p-[10px] text-white text-[13px] leading-4 tracking-[0.12px]  rounded-md flex items-center justify-center mr-4 hover:bg-opacity-90 duration-300"
          >
            Produkt qo'shish
            <span className="inline-block m-0 p-0 ml-3 text-[18px]">+</span>
          </Button>
          <Modal
            funcAction={() => dispatch(setLogOut())}
            triggerButtonCont={
              <img
                src="/assets/logout.svg"
                alt="logout"
                width={40}
                height={40}
              />
            }
            actionButtonCont={"LogOut"}
            otherClasses="min-h-14 px-2"
          />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
