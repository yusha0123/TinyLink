import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import PublicRoute from "./utils/PublicRoute";
import "./App.css";
import Loading from "./components/Loading";

const App = () => {
  const Root = lazy(() => import("./routes/Root"));
  const Home = lazy(() => import("./routes/Home"));
  const Login = lazy(() => import("./routes/Login"));
  const Register = lazy(() => import("./routes/Register"));
  return (
    <Suspense fallback={<Loading />}>
      <Router>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route element={<Root />} path="/" exact />
            <Route element={<Login />} path="/login" exact />
            <Route element={<Register />} path="/register" exact />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route element={<Home />} path="/home" exact />
          </Route>
        </Routes>
      </Router>
    </Suspense>
  );
};

export default App;
