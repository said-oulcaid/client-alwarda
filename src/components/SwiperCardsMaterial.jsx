
import { Swiper, SwiperSlide } from 'swiper/react';


import 'swiper/css';
import 'swiper/css/effect-cards';


import { EffectCards } from 'swiper/modules';

export default function SwiperCardsMaterial() {
  return (
    <>
      <Swiper
        effect={'cards'}
        grabCursor={true}
        modules={[EffectCards]}
        className="w-[200px] h-[180px]"
      >
        <SwiperSlide className='rounded-lg bg-gray-200 p-3 flex justify-center items-center h-fit'> <span className='w-[200px] bg-black'>Slide 1</span></SwiperSlide>
        <SwiperSlide className='rounded-lg bg-gray-200 p-3 flex justify-center items-center '>Slide 1</SwiperSlide>
        <SwiperSlide className='rounded-lg bg-gray-200 p-3 flex justify-center items-center '>Slide 1</SwiperSlide>
       
      </Swiper>
    </>
  );
}
