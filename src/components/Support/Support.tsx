'use client';
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { supports } from "@/constants/constants";
import Image from "next/image";
import React from "react";

const Support = () => {
    return (
        <section className='my-12 md:my-28'>
            <Swiper
                height={50}
                slidesPerView={1}
                spaceBetween={10}
                style={{
                    paddingBottom: 45,
                    '--swiper-pagination-color': '#00BADB'
                } as React.CSSProperties}
                pagination={{
                    clickable: true,
                }}
                breakpoints={{
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 40,
                    },
                    1080: {
                        slidesPerView: 4,
                        spaceBetween: 50,
                    },
                }}
                modules={[Pagination]}
                className="mySwiper"
            >
                {
                    supports.map((support, idx) => <SwiperSlide key={idx}>
                        <div className='flex items-center flex-col group'>
                            <Image
                                className='object-contain group-hover:animate-pulse'
                                alt='support icons'
                                height={55}
                                width={55}
                                src={support.img}
                            />
                            <h1 className='text-lg font-semibold mt-2'>{support.title}</h1>
                            <h5 className='mt-1 text-gray-600'>{support.description}</h5>
                        </div>
                    </SwiperSlide>)
                }
            </Swiper>
        </section>
    );
};

export default Support;