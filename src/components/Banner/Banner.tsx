'use client';
import Flicking, { ViewportSlot } from "@egjs/react-flicking";
import { AutoPlay, Pagination } from "@egjs/flicking-plugins";
import "@egjs/react-flicking/dist/flicking-inline.css";
import "@egjs/flicking-plugins/dist/arrow.css";
import "@egjs/flicking-plugins/dist/pagination.css";
import { banners } from "@/constants/constants";
import { useRouter } from "next/navigation";

const Banner = () => {
    const router = useRouter();
    const _plugins = [
        new AutoPlay({ duration: 4000 }),
        new Pagination({ type: 'scroll' })
    ];

    return (
        <section className='h-[320px] md:h-[450px] lg:h-[calc(100vh-84px)] cursor-grab'>
            <Flicking circular={true} plugins={_plugins}>
                {
                    banners.map((banner, idx) => <div key={idx} className='w-full h-full bg-no-repeat bg-center md:bg-top bg-cover object-contain flex-1' style={{ backgroundImage: `url(${banner.img})` }}>
                        <div className=' h-full bg-black/5'>
                            <div className='flex items-center justify-center px-8 md:px-16 xl:px-72 h-full w-full text-center text-white'>
                                <div className='w-full'>
                                    <h3 className='text-xl md:text-2xl lg:text-3xl'>{banner.subtitle}</h3>
                                    <h1 className='text-3xl md:text-6xl lg:text-8xl mt-2 md:mt-4 mb-4 md:mb-7'>{banner.title}</h1>
                                    <button onClick={() => router.push('/collections')} className='w-[119px] md:w-[145px] lg:w-[190px] text-sm md:text-base py-2 md:py-3 lg:py-4 transition-all duration-500 bg-white text-black hover:bg-black hover:text-white'>
                                        Shop Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>)
                }
                <ViewportSlot>
                    <div className="flicking-pagination"></div>
                </ViewportSlot>
            </Flicking>
        </section>
    );
};

export default Banner;