import axios from "axios";
import React from "react";
import Loader from "../../pages/Loader.jsx";
import { useQuery } from "react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./categories.css";

function Categories() {
  const userToken = localStorage.getItem("userToken");
  const getCategories = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/categories/active?limit=20`,
      { headers: { Authorization: `Tariq__${userToken}` } }
    );
    return data;
  };

  const { data, isLoading } = useQuery("get_categories", getCategories);
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className='categories'>
      <div className="container text-center">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          spaceBetween={5}
          slidesPerView={4}
          loop={true}
          autoplay={{
            delay: 3000,
          }}
          pagination={{
            clickable: true,
            el: ".swiper-pagination",
          }}
        >
          {data?.categories.length ? (
            data?.categories.map((category) => (
              <SwiperSlide key={category._id}>
                <Link to={`/products/category/${category._id}`}>
                  <div className="category">
                    <img src={category.image.secure_url} alt="Category image" />
                  </div>
                </Link>
              </SwiperSlide>
            ))
          ) : (
            <h2>No Category founed</h2>
          )}
        </Swiper>
        <div className="swiper-pagination"></div>
      </div>
    </div>
  );
}

export default Categories;
