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
        title: " Life is Better with a Dog by Your Side",
        description: "Dogs bring joy to the simplest moments of our lives. Their loyalty, playful spirit, and unconditional love remind us what true companionship feels like.",
    },
    {
        image: banner2,
        title: "Find Your New Best Friend",
        description: "A true best friend doesn’t always come in human form—sometimes they arrive with four paws and a wagging tail. Dogs have a special way of filling our lives with love, laughter, and companionship.",
    },
    {
        image: banner3,
        title: "Every Dog Deserves a Happy Home",
        description: "Every dog is worthy of love, care, and a safe shelter. They are not just pets, but loyal companions and family members who bring joy, comfort, and unconditional love into our lives.",
    },
];
const Banner = () => {
    return (
        <section className="w-full  mt-5">
            <Swiper
                modules={[Autoplay, Pagination]}
                autoplay={{ delay: 3000 }}
                pagination={{ clickable: true }}
                loop={true}
                className="w-full h-[700px] md:h-[800px]"
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
                                    {slide.description}
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

