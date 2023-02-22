import React, {Fragment, useEffect} from "react";

import {Swiper, SwiperSlide} from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import {Pagination, Navigation} from "swiper";

const AboutUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Fragment>
      <h1 className="about-us__title">About Us</h1>
      <div className="about-us">
        <div className="company">
          <section className="fashion">
            <div className="fashion__description">
              <h3 className="fashion__title">Love fashion</h3>
              <p className="fashion__details">
                With over 40 years of fashion retailing experience, Ellnot is one of the most
                well-established and loved brands in the industry. We pride ourselves on our
                stylish, affordable fashion. Our customers can always rely on us, to pick up
                everything they need from occasion wear, to amazing denim, and fabulous bags and
                shoes.
              </p>
            </div>
            <img
              src="../../../img/about-us/about-us4.jpg"
              alt="love Ellnot image"
              className="fashion__img"
            />
          </section>
          <section className="ellnot">
            <div className="ellnot__description">
              <h3 className="ellnot__title">Love Ellnot</h3>
              <p className="ellnot__details">
                At Ellnot great design is at the heart of everything we create. Almost all our
                products are designed in-house, and we are proud to deliver new and original
                fashion for you every single week.
              </p>
            </div>
            <img
              src="../../../img/about-us/about-us2.jpg"
              alt="love Ellnot image"
              className="ellnot__img"
            />
          </section>
        </div>

        <div className="sustainability">
          <img
            src="../../../img/about-us/about-us3.jpg"
            alt="sustainability pic1"
            className="sustainability__img1"
          />
          <img
            src="../../../img/about-us/about-us1.jpg"
            alt="sustainability pic2"
            className="sustainability__img2"
          />
          <section className="sustainability__section">
            <div className="sustainability__container">
              <h4 className="sustainability__title">Sustainability</h4>
              <p className="sustainability__description">
                Our commitment to building a relationship with the environment and our society,
                that puts in more than it takes out.
              </p>
            </div>
          </section>
        </div>

        <div className="by-you">
          <h3 className="by-you__title">Worn by you</h3>
          <Swiper
            breakpoints={{
              500: {
                width: 500,
                spaceBetween: 10,
                slidesPerView: 2,
                slidesPerGroup: 2,
              },
              400: {
                slidesPerView: 1,
                slidesPerGroup: 1,
              },
              800: {
                width: 800,
                slidesPerView: 3,
                slidesPerGroup: 3,
              },
            }}
            slidesPerView={3}
            spaceBetween={30}
            slidesPerGroup={3}
            loop={true}
            loopFillGroupWithBlank={true}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="mySwiper"
          >
            <SwiperSlide>
              <img
                src="../../../img/about-us/about-us5.jpg"
                alt="worn by you pic1"
                className=" by-you__img"
              />
            </SwiperSlide>

            <SwiperSlide>
              <img
                src="../../../img/about-us/about-us6.jpg"
                alt="worn by you pic2"
                className="by-you__img"
              />
            </SwiperSlide>

            <SwiperSlide>
              <img
                src="../../../img/about-us/about-us7.jpg"
                alt="worn by you pic3"
                className="by-you__img"
              />
            </SwiperSlide>

            <SwiperSlide>
              <img
                src="../../../img/about-us/about-us8.jpg"
                alt="worn by you pic4"
                className="by-you__img"
              />
            </SwiperSlide>

            <SwiperSlide>
              <img
                src="../../../img/about-us/about-us9.jpg"
                alt="worn by you pic5"
                className="by-you__img"
              />
            </SwiperSlide>

            <SwiperSlide>
              <img
                src="../../../img/about-us/about-us10.jpg"
                alt="worn by you pic6"
                className="by-you__img"
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </Fragment>
  );
};

export default AboutUs;
