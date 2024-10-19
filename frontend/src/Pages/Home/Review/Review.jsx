import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";

import { Rating } from "@smastrom/react-rating";

import "@smastrom/react-rating/style.css";

const Review = (props) => {
  const [reviews, setReview] = useState([]);
  useEffect(() => {
    fetch("reviews.json")
      .then((res) => res.json())
      .then((data) => setReview(data));
  }, []);

  return (
    <>
      <section className="max-w-7xl mx-auto">
        <div className="text-center">
          <div className="my-12">
            <h2 className="text-4xl font-extrabold text-purple-600 tracking-wide">
              What Our Clients Are Saying
            </h2>
            <p className="text-xl text-gray-700 mt-4 italic">
              Hear the experiences straight from our valued customers.
            </p>
          </div>
        </div>
        <div>
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination]}
            className="mySwiper"
          >
            {reviews.map((review) => (
              <SwiperSlide key={review._id}>
                <div className="flex flex-col items-center space-y-6 m-24 mt-10">
                  <Rating
                    style={{ maxWidth: 250 }}
                    value={review.rating}
                    readOnly
                  />
                  <p>{review.reviewText}</p>
                  <h3 className="text-3xl text-yellow-900">
                    {review.username}
                  </h3>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </>
  );
};

export default Review;
