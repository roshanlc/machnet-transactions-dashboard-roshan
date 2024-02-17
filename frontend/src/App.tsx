import "./App.css";
import Error404 from "./components/pages/error/Error404";
import TransactionPage from "./components/pages/transaction/main/TransactionPage";
import ResponsiveDrawer from "./components/sidebar/ResponsiveDrawer";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="">
          <Route
            path="/"
            element={
              <ResponsiveDrawer>
                <TransactionPage />
              </ResponsiveDrawer>
            }
          />
          <Route
            path="*"
            element={
              <ResponsiveDrawer>
                <Error404 />
              </ResponsiveDrawer>
            }
          />
        </Route>
        {/* <ResponsiveDrawer /> */}
      </Routes>
    </>
  );
}

export default App;
