import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// import required modules
import { EffectCoverflow, Pagination } from "swiper/modules";
import PaymentStudentsDetails from "./PaymentStudentsDetails";
import { translateMonthToFrench } from "../utils/utils";

export default function SwipperStudentsPaymentsDetails({ payments }) {
  return (
    <>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={1}
        coverflowEffect={{
          rotate: 30, // Reduce rotation to lessen the blur effect
          stretch: 0,
          depth: 200, // Increase depth for better clarity
          modifier: 1,
          slideShadows: false,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="w-full h-fit rounded-lg  "
        breakpoints={{
          979: {
            slidesPerView: 1,
          },

          980: {
            slidesPerView: 3,
          },
          1700: {
            slidesPerView: 4,
          },
        }}
      >
        {payments?.map((payment) => (
          <SwiperSlide className="w-[250px] h-fit bg-white dark:bg-[#242526] rounded-lg p-3 flex flex-col items-center justify-center ">
            <div className="w-full text-center">
              <h1 className="font-bold underline underline-offset-4">
                {translateMonthToFrench(payment.month)}
              </h1>
            </div>
            <PaymentStudentsDetails payment={payment} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
