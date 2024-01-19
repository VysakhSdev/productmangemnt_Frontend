import { Route, Routes } from "react-router-dom";
import Children from "./Routes/MainLayout";
import Login from "./pages/Public/Login";
import PrivateRoute from "./utils/PrivateRoute";
import Home from "./pages/Product/Home";
import Register from "./pages/Public/Register";
import ProductDeetails from "./pages/Product/ProductDeetails";
import { Productdetailspath } from "./utils/Constants";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/Register" element={<Register />} />

        <Route
          path="/"
          element={
            <PrivateRoute>
              <Children />
            </PrivateRoute>
          }
        >
          <Route index element={<Home/>} />
          <Route path={Productdetailspath} element={<ProductDeetails/>} />

        </Route>
      </Routes>
    </>
  );
}

export default App;
