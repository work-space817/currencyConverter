import { IExhangeRate, Rate } from "./types";

const URL = `https://api.currencybeacon.com/v1/latest`;
const API_KEY = `3VVZDiDF8BF3ZMKlDQlYaVP207g1XYXH`;

const getExchangeRate = async (base: string, symbols: string) => {
  const response = await fetch(
    `${URL}?api_key=${API_KEY}&base=${base}&symbols=${symbols}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const result = (await response.json()) as IExhangeRate;

  const roundedRates = Object.keys(result.rates).reduce((acc, key) => {
    acc[key] = result.rates[key];
    return acc;
  }, {} as Rate);

  return roundedRates;
};

export default getExchangeRate;
