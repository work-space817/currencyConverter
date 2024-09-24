import { memo } from "react";
import CurrencyConverter from "../../../components/convertor/CurrencyConverter";

const HomePage = memo(() => {
  return (
    <>
      <CurrencyConverter />
    </>
  );
});

export default HomePage;
