
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay, Pagination } from "swiper/modules";
import gsap from "gsap";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "./App.css";

import redBottle from "./assets/images/red.png";
import greenBottle from "./assets/images/green.png";
import pinkBottle from "./assets/images/pink.png";
import blackBottle from "./assets/images/black.png";
import blueBottle from "./assets/images/blue.png";
import goldBottle from "./assets/images/gold.png";

const slides = [
  {
    name: "Sparkling",
    bottle: redBottle,
    bg: "#F8D5D1",
    fruits: ["🍓", "🍒", "🍓", "🍒"],
  },
  {
    name: "Exotic",
    bottle: greenBottle,
    bg: "#CDBBFF",
    fruits: ["🥝", "🍈", "🥝", "🍈"],
  },
  {
    name: "Blush",
    bottle: pinkBottle,
    bg: "#F9D5E5",
    fruits: ["🍒", "🍓", "🍒", "🍓"],
  },
  {
    name: "Midnight",
    bottle: blackBottle,
    bg: "#D8D7DE",
    fruits: ["🍇", "🫐", "🍇", "🫐"],
  },
  {
    name: "Ocean",
    bottle: blueBottle,
    bg: "#D0E8F7",
    fruits: ["🫐", "🍇", "🫐", "🍇"],
  },
  {
    name: "Golden",
    bottle: goldBottle,
    bg: "#F8E8B8",
    fruits: ["🍋", "🍊", "🍋", "🍊"],
  },
];

export default function App() {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const animateActiveSlide = (swiper) => {
    if (!swiper || !swiper.slides) return;

    const activeSlide = swiper.slides[swiper.activeIndex];
    if (!activeSlide) return;

    const bottle = activeSlide.querySelector(".wine-bottle");
    const title = activeSlide.querySelector(".wine-title");
    const fruits = activeSlide.querySelectorAll(".wine-fruit");

    if (bottle) {
      gsap.fromTo(
        bottle,
        {
          opacity: 0,
          y: 35,
          scale: 0.88,
          rotation: -5,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotation: 0,
          duration: 0.8,
          ease: "power3.out",
          overwrite: true,
        }
      );
    }

    if (title) {
      gsap.fromTo(
        title,
        {
          opacity: 0,
          scale: 0.9,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.7,
          ease: "power2.out",
          overwrite: true,
        }
      );
    }

    if (fruits.length) {
      gsap.fromTo(
        fruits,
        {
          opacity: 0,
          scale: 0.5,
          y: 25,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.7)",
          overwrite: true,
        }
      );
    }
  };

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.realIndex);
    document.querySelector(".wine-app")?.style.setProperty(
      "background-color",
      slides[swiper.realIndex].bg
    );
  };

  const previousSlide = () => {
    swiperRef.current?.slidePrev();
  };

  const nextSlide = () => {
    swiperRef.current?.slideNext();
  };

  return (
    <main
      className="wine-app"
      style={{ backgroundColor: slides[activeIndex].bg }}
    >
      <Swiper
        className="wine-swiper"
        modules={[EffectFade, Autoplay, Pagination]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        slidesPerView={1}
        loop={true}
        speed={500}
        autoplay={{
          delay: 1800,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}
        pagination={{ clickable: true }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;

          setTimeout(() => {
            animateActiveSlide(swiper);
          }, 100);
        }}
        onSlideChange={handleSlideChange}
        onSlideChangeTransitionStart={(swiper) => {
          animateActiveSlide(swiper);
        }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.name}>
            <section
              className="wine-slide"
              style={{ backgroundColor: slide.bg }}
            >
              <div className="wine-content">
                <h1 className="wine-title">{slide.name}</h1>

                <div className="wine-fruits">
                  {slide.fruits.map((fruit, fruitIndex) => (
                    <span
                      className="wine-fruit"
                      key={`${slide.name}-${fruitIndex}`}
                    >
                      {fruit}
                    </span>
                  ))}
                </div>

                <img
                  className="wine-bottle"
                  src={slide.bottle}
                  alt={`${slide.name} wine bottle`}
                  draggable="false"
                />
              </div>
            </section>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* LEFT PREVIOUS ARROW */}
      <button
        type="button"
        className="wine-arrow wine-arrow-left"
        onClick={previousSlide}
        aria-label="Previous wine"
      >
        <svg
          viewBox="0 0 24 24"
          width="26"
          height="26"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 12H5" />
          <path d="m12 19-7-7 7-7" />
        </svg>
      </button>

      {/* RIGHT NEXT ARROW */}
      <button
        type="button"
        className="wine-arrow wine-arrow-right"
        onClick={nextSlide}
        aria-label="Next wine"
      >
        <svg
          viewBox="0 0 24 24"
          width="26"
          height="26"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </button>
    </main>
  );
}
