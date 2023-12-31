import axios from "axios";
import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import { UserContext } from "./user.jsx";

export const CartContext = createContext(null);

export function CartContextProvider({ children }) {
  let [cart, setCart] = useState(null);
  let [cartTotal, setCartTotal] = useState(0);
  let { cartCount, setCartCount, setLoading } =
    useContext(UserContext);
  const userToken = localStorage.getItem("userToken");

  const addToCartContext = async (productId) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/cart`,
        { productId },
        { headers: { Authorization: `Tariq__${userToken}` } }
      );
      if (data.message == "success") {
        toast.success("Product Added", {
          position: "top-left",
          autoClose: true,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      setCartCount(++cartCount);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const getCartContext = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/cart`, {
        headers: { Authorization: `Tariq__${userToken}` },
      });
      setCartCount(data.count);
      setCart(data.products);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const removeItemContext = async (productId) => {
    try {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API_URL}/cart/removeItem`,
        { productId },
        { headers: { Authorization: `Tariq__${userToken}` } }
      );
      setCartCount(--cartCount);
      calculateTotal();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const clearCart = async () => {
    try {
      setLoading(true);
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API_URL}/cart/clear`,
        {},
        {
          headers: { Authorization: `Tariq__${userToken}` },
        }
      );
      if (data.message == "success") {
        calculateTotal();
        setCartCount(0);
        setCart([]);
      }
      setLoading(false);
      return data;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const incraseQty = async (productId) => {
    try {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API_URL}/cart/incraseQuantity`,
        { productId: productId },
        { headers: { Authorization: `Tariq__${userToken}` } }
      );
      calculateTotal();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const decraseQty = async (productId) => {
    try {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API_URL}/cart/decraseQuantity`,
        { productId: productId },
        { headers: { Authorization: `Tariq__${userToken}` } }
      );
      calculateTotal();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const calculateTotal = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/cart`, {
      headers: { Authorization: `Tariq__${userToken}` },
    });
    let total = 0;
    data.products?.map((product) => {
      total += product.quantity * product.details.finalPrice;
    });
    setCartTotal(total);
  };

  return (
    <CartContext.Provider
      value={{
        addToCartContext,
        getCartContext,
        removeItemContext,
        clearCart,
        incraseQty,
        decraseQty,
        cart,
        setCart,
        cartTotal,
        setCartTotal,
        calculateTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
