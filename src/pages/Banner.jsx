// src/components/shared/Banner.jsx

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay, Pagination } from "swiper/modules";
import { Button } from "@/components/ui/button";
import banner1 from "../assets/banner1.jpg";
import banner2 from "../assets/banner2.png";
import banner3 from "../assets/banner3.png";


const slides = [
    {
        image: banner1,
        title: "Adopt a Pet, Save a Life",
        description: "Discover loving pets waiting for you",
    },
    {
        image: banner2,
        title: "Find Your New Best Friend",
        description: "Browse our available pets and find your perfect match",
    },
    {
        image: banner3,
        title: "Give a Pet a Second Chance",
        description: "Your new companion is waiting for you",
    },
];
const Banner = () => {
    return (
        <section className="w-full mt-5">
            <Swiper
                modules={[Autoplay, Pagination]}
                autoplay={{ delay: 3000 }}
                pagination={{ clickable: true }}
                loop={true}
                className="w-full h-[400px] md:h-[500px]"
            >
                {slides.map((slide, i) => (
                    <SwiperSlide key={i}>
                        <div
                            className="h-full w-full bg-cover bg-center flex items-center justify-center"
                            style={{ backgroundImage: `url(${slide.image})` }}
                        >
                            <div className="bg-black/50 p-6 rounded-lg text-center text-white max-w-xl">
                                <h2 className="text-3xl md:text-5xl font-bold mb-4">
                                    {slide.title}
                                </h2>
                                <p className="mb-4 text-sm md:text-lg">
                                    Adoption is a compassionate and life-changing process where a person or family legally takes responsibility for raising a child or pet that is not biologically their own.
                                </p>

                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default Banner;

