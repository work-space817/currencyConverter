import { FC, InputHTMLAttributes } from "react";

interface ICustomInput extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  type?: "text" | "number";
  field?: string;
}

const CustomInput: FC<ICustomInput> = ({ type = "text", ...props }) => {
  return (
    <div className="w-full">
      {props.label && (
        <label htmlFor={props.field} className="form-label">
          {props.label}
        </label>
      )}
      <input
        {...props}
        className={`w-full  border-solid border-2 p-1 rounded-md ${props.className} `}
      />
    </div>
  );
};

export default CustomInput;
