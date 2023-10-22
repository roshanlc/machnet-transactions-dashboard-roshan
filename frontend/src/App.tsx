import "./App.css";
import Error404 from "./components/pages/Error404";
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
                <p>Welcome home</p>
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
