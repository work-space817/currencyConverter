import { FC, SelectHTMLAttributes } from "react";

interface ICustomSelect extends SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string }[];
}

const CustomSelect: FC<ICustomSelect> = (props) => {
  return (
    <select
      {...props}
      className={`block max-w-min selection: p-1 bg-white border border-gray-300
        rounded-md focus:outline-none focus:ring-2
      focus:ring-blue-500 focus:border-blue-500 ${props.className}`}
      onChange={props.onChange}
    >
      {props.options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default CustomSelect;
