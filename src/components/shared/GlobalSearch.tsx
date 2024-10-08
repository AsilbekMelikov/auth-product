import { Input } from "../../../@/components/ui/input";

const GlobalSearch = () => {
  return (
    <div className="relative w-full max-w-[600px] max-lg:hidden ">
      <div className="bg-background relative flex min-h-[56px] grow items-center gap-1 rounded-xl px-4">
        <img
          src={"/assets/search.svg"}
          width={24}
          height={24}
          className="cursor-pointer"
          alt={"global search"}
        />
        <Input
          type="text"
          placeholder="Search globally"
          className="paragraph-regular no-focus placeholder background-light800_darkgradient border-none shadow-none outline-none"
        />
      </div>
    </div>
  );
};

export default GlobalSearch;
