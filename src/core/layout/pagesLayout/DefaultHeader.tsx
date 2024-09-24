import { memo, useEffect } from "react";
import useConverterController, {
  Currencies,
} from "../../../components/convertor/useConverterController";

const DefaultHeader = memo(() => {
  const { rateBy, getRateBy } = useConverterController();

  useEffect(() => {
    getRateBy(Currencies.UAH);
  }, []);

  const rates = (
    <>
      {Object.keys(rateBy).length > 0 &&
        Object.keys(rateBy).map((baseCurrency) => (
          <div key={baseCurrency} className="flex gap-4">
            {rateBy[baseCurrency].map((rateObj, index) => {
              const currency = Object.keys(rateObj)[0];
              const rate = rateObj[currency];
              return (
                <div key={index} className="flex items-center gap-2">
                  <span>{currency}:</span>
                  <span>{rate}</span>
                </div>
              );
            })}
          </div>
        ))}
    </>
  );

  return (
    <div className="w-full bg-slate-300 flex justify-center items-center">
      <div className="w-4/6 py-8 flex justify-around items-center">
        <span>Currency Converter</span>
        <span>{rates}</span>
      </div>
    </div>
  );
});

export default DefaultHeader;
