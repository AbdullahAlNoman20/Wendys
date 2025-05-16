import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Components/Root.jsx";
import Error from "./Components/Error.jsx";
import Home from "./Components/Home.jsx";
import Login from "./Components/Login.jsx";
import MyCard from "./Components/MyCard.jsx";
import Register from "./Components/Register.jsx";
import Profile from "./Components/Profile.jsx";
import Contact from "./Components/Contact.jsx";
import ServiceDetails from "./Components/ServiceDetails.jsx";
import AuthProvider from "./AuthProvider/AuthProvider.jsx";
import PrivateRout from "./AuthProvider/PrivateRout.jsx";
import Developers from "./Components/Developers.jsx";
import DeveloperDetails from "./Components/DeveloperDetails.jsx";
import ProductDetails from "./Components/ProductDetails.jsx";
import ProductOrder from "./Components/ProductOrder.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/profile",
        element: (
          <PrivateRout>
            <Profile></Profile>
          </PrivateRout>
        ),
      },
      {
        path: "/contact",
        element: (
          <PrivateRout>
            <Contact></Contact>
          </PrivateRout>
        ),
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/myCard",
        element: <MyCard></MyCard>,
      },
      {
        path: "/service_details/:id",
        element: <ServiceDetails></ServiceDetails>,
        loader: () => fetch("services.json"),
      },
      {
        path: "/developers",
        element: <Developers></Developers>,
        loader: () => fetch("http://localhost:5000/developers"),
      },
      {
        path: "/developers_details/:id",
        element: <PrivateRout><DeveloperDetails></DeveloperDetails></PrivateRout>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/developers_details/${params.id}`),
      },
      {
        path: "/product_details/:p_id",
        element: <PrivateRout><ProductDetails></ProductDetails></PrivateRout>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/product_details/${params.p_id}`),
      },
      {
        path: "/buyNow/:id",
        element: <PrivateRout><ProductOrder></ProductOrder></PrivateRout>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/product_details/${params.id}`),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <div className="">
        <RouterProvider router={router} />
      </div>
    </AuthProvider>
  </StrictMode>
);
