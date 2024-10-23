import React, { memo } from "react";
import { Outlet } from "react-router-dom";
import DefaultHeader from "./DefaultHeader";

const DefaultLayout = memo(() => {
  return (
    <div className="w-full dwadwa">
      <DefaultHeader />
      <div className="flex flex-col py-4 px-6">{<Outlet />}</div>
    </div>
  );
});

export default DefaultLayout;
