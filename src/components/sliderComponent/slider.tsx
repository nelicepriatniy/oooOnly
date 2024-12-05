import React, { useEffect, useState } from "react";
import s from "./style.module.scss";
import { Swiper, SwiperSlide, SwiperClass } from "swiper/react";
import "swiper/css";

interface DataItem {
  id: number;
  num: number;
  text: string;
  heading: string;
  isActive?: boolean;
}

interface SliderComponentProps {
  data: DataItem[];
}

const SliderComponent = ({ data }: SliderComponentProps) => {
  const [activeAngle, setActiveAngle] = useState<number>(1);
  const [dataState, setData] = useState<DataItem[]>(data);
  const [swiperInstance, setSwiperInstance] = useState<SwiperClass | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(1);
  const [nums, setNums] = useState<{ start: number; end: number }>({
    start: 2015,
    end: 2022,
  });

  const changeActiveClick = (index: number) => {
    let copyData = structuredClone(data)
    copyData.forEach((item) => (item.isActive = false));
    copyData[index - 1].isActive = true;

    const angles: { [key: number]: number } = {
      1: 0,
      2: 65,
      3: 120,
      4: 180,
      5: 245,
      6: 295,
    };
    setActiveAngle(angles[index] || 0);
    setActiveIndex(index);
    setData([...copyData]);
  };

  const changeNums = (index: number) => {
    if (data.length > index + 1) {
      setNums({
        start: data[index].num,
        end: data[index + 1].num,
      });
    } else if (data.length <= index + 1) {
      setNums({
        start: data[index].num,
        end: new Date().getFullYear(),
      });
    }
  };

  const changeSlide = (index: number) => {
    if (swiperInstance) {
      swiperInstance.slideTo(index - 1);
    }
  };

  useEffect(() => {
    setData(data);
  }, [data]);

  return (
    <div className={s.container}>
      <div className={s.heading}>
        <p className={s.headingText}>Исторические даты</p>
      </div>
      <div className={s.datsContainer}>
        <div className={s.datsSerc}>
          <div className={s.datsText}>
            <p className={s.datsStart}>{nums.start}</p>
            <p className={s.datsEnd}>{nums.end}</p>
          </div>
          <div
            className={s.datsItems}
            style={{ transform: `rotate(${activeAngle}deg)` }}
          >
            {dataState.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  changeActiveClick(item.id);
                  changeSlide(item.id);
                }}
                className={`${s.datsItem} ${
                  item.isActive ? s.active : s.notActive
                }`}
              >
                <div
                  className={s.datsItemInfo}
                  style={{ transform: `rotate(-${activeAngle}deg)` }}
                >
                  <div className={s.datsItemNum}>{item.id}</div>
                  <div className={s.datsItemTitle}>{item.heading}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={s.sliderInterface}>
        <div className={s.sliderCount}>
          <p className={s.sliderCountText}>0{activeIndex}</p>
          <p className={s.sliderCountText}>/</p>
          <p className={s.sliderCountText}>0{data.length}</p>
        </div>
        <div className={s.sliderArrows}>
          <svg
            onClick={() => {
              if (activeIndex > 0) {
                changeSlide(activeIndex - 1);
              }
            }}
            className={`${s.sliderArrow} ${
              activeIndex === 1 ? s.disable : s.active
            }`}
            viewBox="0 0 50 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="25"
              cy="25"
              r="24.5"
              transform="matrix(-1 0 0 1 50 0)"
              stroke="#42567A"
              strokeOpacity="0.5"
            />
            <path
              d="M27.5 18.75L21.25 25L27.5 31.25"
              stroke="#42567A"
              strokeWidth="2"
            />
          </svg>
          <svg
            onClick={() => {
              if (activeIndex < data.length) {
                changeSlide(activeIndex + 1);
              }
            }}
            className={`${s.sliderArrow} ${
              data.length === activeIndex ? s.disable : s.active
            }`}
            viewBox="0 0 50 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="25"
              cy="25"
              r="24.5"
              transform="matrix(-1 0 0 1 50 0)"
              stroke="#42567A"
              strokeOpacity="0.5"
            />
            <path
              d="M27.5 18.75L21.25 25L27.5 31.25"
              stroke="#42567A"
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>
      <div className={s.sliderWrapper}>
        <div className={s.slider}>
          <div
            onClick={() => {
              if (activeIndex > 0) {
                changeSlide(activeIndex - 1);
              }
            }}
            className={`${s.sliderInsightArr} ${
              activeIndex === 1 ? s.disable : s.active
            }`}
          >
            <svg
              className={s.sliderInsightArrSvg}
              viewBox="0 0 8 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1 1L6 6L1 11" stroke="#3877EE" strokeWidth="2" />
            </svg>
          </div>
          <Swiper
            spaceBetween={80}
            slidesPerView={3}
            simulateTouch={true}
            onSlideChange={(swiper) => {
              changeActiveClick(swiper.activeIndex + 1);
              changeNums(swiper.activeIndex);
            }}
            onSwiper={setSwiperInstance} 
          >
            {dataState.map((item) => (
              <SwiperSlide key={item.id} id={`slider${item.id}`}>
                <div className={s.slideContainer}>
                  <div className={s.slideHeading}>{item.num}</div>
                  <div className={s.slideText}>{item.text}</div>
                </div>
              </SwiperSlide>
            ))}
            <SwiperSlide></SwiperSlide>
            <SwiperSlide></SwiperSlide>
          </Swiper>
          <div
            onClick={() => {
              if (activeIndex < data.length) {
                changeSlide(activeIndex + 1);
              }
            }}
            className={`${s.sliderInsightArr} ${
              data.length === activeIndex ? s.disable : s.active
            }`}
          >
            <svg
              className={s.sliderInsightArrSvg}
              viewBox="0 0 8 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1 1L6 6L1 11" stroke="#3877EE" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SliderComponent;
