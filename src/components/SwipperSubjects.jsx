import React, { useRef, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-cards";
import { Autoplay, EffectCards } from "swiper/modules";
import { Chip } from "@nextui-org/react";
import { FaUserTie } from "react-icons/fa";

export default function SwipperSubjects({ subjects = [] }) {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };
  return (
    <>
      <Swiper
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards, Autoplay]}
        className="w-[250px] h-[300px]"
        autoplay={{
          delay: 10000,
          disableOnInteraction: false,
        }}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
      >
        {subjects.map((s, i) => (
          <SwiperSlide className="w-full h-full rounded-lg    p-3 bg-white dark:bg-[#242526]   ">
            <div className="w-full h-full flex flex-col items-center overflow-y-auto">
              <h1 className="text-2xl font-bold tracking-wider">
                {s.pricePerMonth} DH
              </h1>

              <Chip size="lg" variant="faded" className="mt-3">
                {s.name}
              </Chip>

              <div className="w-full text-start flex-1 flex flex-col gap-2 justify-center">
                <Chip size="lg" variant="flat" startContent={<FaUserTie />}>
                  Moahamed Alami
                </Chip>
                <Chip size="lg" variant="flat">
                  {s.school}
                </Chip>
              </div>
            </div>
            <div className="absolute left-[16px] bottom-[16px]">
              <Chip radius="full" color="primary">
                {i + 1}/{subjects.length}
              </Chip>
            </div>
          </SwiperSlide>
        ))}
        {subjects.length > 0 && (
          <div className="autoplay-progress" slot="container-end">
            <svg viewBox="0 0 48 48" ref={progressCircle}>
              <circle cx="24" cy="24" r="20"></circle>
            </svg>
            <span ref={progressContent}></span>
          </div>
        )}
      </Swiper>
    </>
  );
}
