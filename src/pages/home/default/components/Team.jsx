import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import arfanPng from 'assets/team_arfan.png';
import balePng from 'assets/team_bale.png';
import helmyPng from 'assets/team_helmy.png';
import zakiPng from 'assets/team_zaki.png';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

const Team = () => {
    SwiperCore.use([Pagination, Navigation]);

    const listTeam = [
        {
            name: 'Arfan Jadulhaq',
            image: arfanPng,
        },
        {
            name: 'Muhammad Helmy Faishal',
            image: helmyPng,
        },
        {
            name: 'Muhammad Zaky Al Fatih',
            image: zakiPng,
        },
        {
            name: 'Mochammad Iqbal',
            image: balePng,
        },
    ];

    return (
        <div
            className="container mx-auto flex px-4 w-full flex-col mt-20 md:mt-36 "
            id="our-team"
        >
            <div className="flex justify-center w-full relative z-10 my-10">
                <p className="text-xl text-theme-orange-500 font-bold">
                    Our Team
                </p>
            </div>
            <div className="bg-white relative z-10 full-shadow py-5 rounded-2xl">
                <Swiper
                    slidesPerView={1}
                    spaceBetween={10}
                    loop={true}
                    loopFillGroupWithBlank={true}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    className="mySwiper"
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 40,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 50,
                        },
                    }}
                >
                    {listTeam.map((val, index) => (
                        <SwiperSlide key={index}>
                            <div
                                key={index}
                                className="flex flex-col items-center text-center py-12"
                            >
                                <img
                                    src={val.image}
                                    alt={val.name}
                                    className="w-56"
                                />
                                <p className="py-5">{val.name}</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default Team;
