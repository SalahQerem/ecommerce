import { createBrowserRouter } from "react-router-dom";
import Cart from "../components/web/cart/Cart.jsx";
import Categories from "../components/web/categories/Categories.jsx";
import CategoryDatails from "../components/web/categories/CategoryDetails.jsx";
import Home from "../components/web/home/Home.jsx";
import Login from "../components/web/login/Login.jsx";
import Product from "../components/web/product/Product.jsx";
import Register from "../components/web/register/Register.jsx";
import Layout from "./Layout.jsx";
import DashboardLayout from "./DashboredLayout.jsx";
import DashboredHome from "../components/dashbored/home/Home.jsx";
import DachboredCategories from "../components/dashbored/categories/Categories.jsx";
import ProtectedRoute from "../components/web/protectedRoute/ProtectedRoute.jsx";
import Auth from "../components/web/protectedRoute/Auth.jsx";
import Profile from "../components/web/profile/Profile.jsx";
import ResetPassword from "../components/web/resetPassword/ResetPassword.jsx";
import SendCode from "../components/web/sendCode/SendCode.jsx";
import UserInfo from "../components/web/profile/UserInfo.jsx";
import UserContact from "../components/web/profile/UserContact.jsx";
import Order from "../components/web/order/Order.jsx";
import CreateOrder from "../components/web/createOrder/CreateOrder.jsx";
import Orders from "../components/web/profile/Orders.jsx";
import Products from "../components/web/products/Products.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: (
          <Auth>
            <Login />
          </Auth>
        ),
      },
      {
        path: "products/category/:categoryId",
        element: <CategoryDatails />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "product/:productId",
        element: <Product />,
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "user/profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <UserInfo />,
          },
          {
            path: "contact",
            element: <UserContact />,
          },
          {
            path: "orders",
            element: <Orders />,
          },
        ],
      },
      {
        path: "user/sendcode",
        element: <SendCode />,
      },
      {
        path: "order",
        element: <Order />,
      },
      {
        path: "order/confirm",
        element: <CreateOrder />,
      },
      {
        path: "user/resetpassword",
        element: <ResetPassword />,
      },
      {
        path: "*",
        element: <h2>Page not found --web</h2>,
      },
    ],
  },
  {
    path: "dashbored",
    element: <DashboardLayout />,
    children: [
      {
        path: "home",
        element: <DashboredHome />,
      },
      {
        path: "categories",
        element: <DachboredCategories />,
      },
      {
        path: "*",
        element: <h2>Page not found --admin</h2>,
      },
    ],
  },
]);
