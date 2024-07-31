import React from "react";
import { Input } from "../../../@/components/ui/input";

interface Props {
  labelValue: string;
  type: string;
  inputValue: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputPlaceholder: string;
  validationError: Record<string, string>;
  validationTouch: Record<string, boolean>;
  required?: boolean;
}

const FormInput = (props: Props) => {
  const {
    type,
    labelValue,
    inputValue,
    name,
    onChange,
    inputPlaceholder,
    validationError,
    validationTouch,
    required,
  } = props;

  return (
    <div className="px-4 flex flex-col mb-4">
      <label
        htmlFor={name}
        className="text-1xl tracking-[0.12px] text-black mb-2"
      >
        {labelValue}
        <span
          className={`${required ? "inline" : "hidden"} ml-[2px] text-red-600`}
        >
          *
        </span>
      </label>
      <Input
        type={type}
        id={name}
        name={name}
        value={inputValue}
        className="border border-light-500 rounded-lg min-h-12 outline-none px-3 py-2 text-light-400 text-[15px] leading-4 tracking-[0.12px] focus-within:ring-2 focus-within:ring-inset focus:border-bluetifany focus:outline-none focus:text-black"
        placeholder={inputPlaceholder}
        onChange={onChange}
      />
      {Boolean(validationError[name]) && Boolean(validationTouch[name]) ? (
        <span className="text-red-600 text-[13px] leading-4 tracking-[0.12px]">
          {validationError[name]}
        </span>
      ) : (
        ""
      )}
    </div>
  );
};
export default FormInput;
