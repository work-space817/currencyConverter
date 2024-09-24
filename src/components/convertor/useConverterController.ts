import { Rate, RateBy } from "./../../api/currencyBeacon/types";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import getExchangeRate from "../../api/currencyBeacon/getExchangeRate";

export interface CurrencyField {
  value: number;
  currency: string;
}
export enum Currencies {
  UAH = "UAH",
  USD = "USD",
  EUR = "EUR",
}

const currencyOptions = [
  { label: Currencies.UAH, value: Currencies.UAH },
  { label: Currencies.USD, value: Currencies.USD },
  { label: Currencies.EUR, value: Currencies.EUR },
];

const useConverterController = () => {
  const [fields, setFields] = useState<CurrencyField[]>([
    { value: 0, currency: Currencies.USD },
    { value: 0, currency: Currencies.UAH },
  ]);
  const [rateBy, setRateBy] = useState<RateBy>({});
  const [rates, setRates] = useState<Rate>({});

  const fetchInitialRates = async () => {
    const baseCurrency = fields[0].currency;
    const symbols = currencyOptions.map((item) => item.value).join(",");
    const initialRates = await getExchangeRate(baseCurrency, symbols);
    setRates(initialRates);
  };

  useEffect(() => {
    fetchInitialRates();
  }, []);

  const getRateBy = useCallback((baseCurrency: keyof typeof Currencies) => {
    const symbols = currencyOptions
      .map((item) => item.value)
      .filter((currency) => currency !== baseCurrency)
      .join(",");

    getExchangeRate(baseCurrency, symbols).then((ratesForBaseCurrency) => {
      const result = {
        [baseCurrency]: Object.keys(ratesForBaseCurrency).map((currency) => {
          const newValue = 1 / ratesForBaseCurrency[currency];
          const roundedValue = Number(newValue.toFixed(3));
          return {
            [currency]: roundedValue,
          };
        }),
      };
      setRateBy(result);
    });
  }, []);

  const recalculateValues = useMemo(() => {
    if (Object.keys(rates).length === 0) return fields;
    const baseField = fields.find((field) => field.value > 0) || fields[0];
    const { currency: baseCurrency, value: baseValue } = baseField;

    return fields.map((field) => {
      const newValue =
        baseValue * (rates[field.currency] / rates[baseCurrency]);
      const roundedValue = Number(newValue.toFixed(3));

      return {
        ...field,
        value: roundedValue,
      };
    });
  }, [fields]);

  const handleInputChange =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.target.value;

      const regex = /^[0-9]*\.?[0-9]*$/;

      if (regex.test(inputValue)) {
        console.log("inputValue: ", inputValue);
        const newValue = Number(inputValue);
        const updatedValues = fields.map((item, i) =>
          i === index ? { ...item, value: newValue } : { ...item, value: 0 }
        );
        setFields(updatedValues);
      }
    };

  const handleSelectChange =
    (index: number) => (event: React.ChangeEvent<HTMLSelectElement>) => {
      const newCurrency = event.target.value;
      const updatedValues = fields.map((item, i) =>
        i === index ? { ...item, currency: newCurrency } : item
      );
      setFields(updatedValues);
    };

  return {
    rates,
    fields: recalculateValues,
    currencyOptions,
    rateBy,
    getRateBy,
    handleInputChange,
    handleSelectChange,
  };
};

export default useConverterController;
