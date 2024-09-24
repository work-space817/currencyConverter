import "./App.css";
import { Routes, Route, useRoutes } from "react-router-dom";
import DefaultLayout from "./core/layout/pagesLayout/DefaultLayout";
import HomePage from "./core/pages/home/HomePage";
export const pagesName = {
  HOME_PAGE: "/",
} as const;

function App() {
  return (
    <Routes>
      <Route path={pagesName.HOME_PAGE} element={<DefaultLayout />}>
        <Route index element={<HomePage />} />
      </Route>
    </Routes>
  );
}

export default App;
