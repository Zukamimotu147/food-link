import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';

const Team = () => {
  return (
    <>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false,
        }}
        // pagination={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="mySwiper mt-10 max-w-[90%] lg:max-w-[80%]">
        <SwiperSlide className="flex justify-center items-center w-[300px]">
          <div className="shadow-lg bg-customGreen h-[480px] rounded-xl">
            <img
              src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg"
              className="object-cover rounded-lg"
            />
            <div className="flex flex-col justify-center items-center text-white font-bold text-xl p-5">
              <h2>Marc Jacob Lasam</h2>
              <p>Developer</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="flex justify-center items-center w-[300px]">
          <div className="shadow-lg bg-customGreen h-[480px] rounded-xl">
            <img
              src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg"
              className="object-cover rounded-lg"
            />
            <div className="flex flex-col justify-center items-center text-white font-bold text-xl p-5">
              <h2>Edrian Nathaniel Sangco</h2>
              <p>UI Designer</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="flex justify-center items-center w-[300px]">
          <div className="shadow-lg bg-customGreen h-[480px] rounded-xl">
            <img
              src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg"
              className="object-cover rounded-lg"
            />
            <div className="flex flex-col justify-center items-center text-white font-bold text-xl p-5">
              <h2>James Galvez</h2>
              <p>Co-Founder</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="flex justify-center items-center w-[300px]">
          <div className="shadow-lg bg-customGreen h-[480px] rounded-xl">
            <img
              src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg"
              className="object-cover rounded-lg"
            />
            <div className="flex flex-col justify-center items-center text-white font-bold text-xl p-5">
              <h2>Ge Acad Nalab</h2>
              <p>UI Designer</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="flex justify-center items-center w-[300px]">
          <div className="shadow-lg bg-customGreen h-[480px] rounded-xl">
            <img
              src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg"
              className="object-cover rounded-lg"
            />
            <div className="flex flex-col justify-center items-center text-white font-bold text-xl p-5">
              <h2>Genevieve Amaba</h2>
              <p>UI/UX Designer</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="flex justify-center items-center w-[300px]">
          <div className="shadow-lg bg-customGreen h-[480px] rounded-xl">
            <img
              src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg"
              className="object-cover rounded-lg"
            />
            <div className="flex flex-col justify-center items-center text-white font-bold text-xl p-5">
              <h2>Jhenny Semontiza</h2>
              <p>UI/UX Designer</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="flex justify-center items-center w-[300px]">
          <div className="shadow-lg bg-customGreen h-[480px] rounded-xl">
            <img
              src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg"
              className="object-cover rounded-lg"
            />
            <div className="flex flex-col justify-center items-center text-white font-bold text-xl p-5">
              <h2>John Earl Balabat</h2>
              <p>Founder</p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Team;
