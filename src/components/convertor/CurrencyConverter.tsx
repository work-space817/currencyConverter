import { memo } from "react";
import CustomInput from "../UI/CustomInput";
import CustomSelect from "../UI/CustomSelect";
import useConverterController from "./useConverterController";

const CurrencyConverter = memo(() => {
  const { fields, currencyOptions, handleInputChange, handleSelectChange } =
    useConverterController();

  return (
    <div className="w-full">
      <div className="w-1/3 flex gap-4">
        {fields.map((item, index) => (
          <div key={index} className="flex  gap-2">
            <CustomInput
              className="w-32"
              value={item.value}
              onChange={handleInputChange(index)}
            />
            <CustomSelect
              options={currencyOptions}
              value={item.currency}
              onChange={handleSelectChange(index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
});

export default CurrencyConverter;
