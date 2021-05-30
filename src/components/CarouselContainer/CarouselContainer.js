import 'normalize.css';
import styled from 'styled-components';
import SwiperCore, { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import 'swiper/components/pagination/pagination.scss';
import CarouselSlideContainer from '../CarouselSlideContainer/CarouselSlideContainer';
SwiperCore.use(Pagination);

const slideData = [
    {
        image: 'https://images.pexels.com/photos/3771836/pexels-photo-3771836.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        alt: 'Woman resting after a bike ride',
        h1: 'The Art Of Adventure',
        h2: 'New Ways To Play',
        copy: "We're celebrating warmer days - and introducing brand-new activities that are sure to become favorites!"
    },
    {
        image: 'https://images.pexels.com/photos/6702549/pexels-photo-6702549.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        alt: 'Woman diving under water',
        h1: 'Lorem ipsum dolor sit amet',
        h2: 'Consectetur adipiscing elit',
        copy: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.'
    },
    {
        image: 'https://images.pexels.com/photos/414012/pexels-photo-414012.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        alt: 'Man doing a cartwheel on the beach',
        h1: 'Sed ut perspiciatis',
        h2: 'Unde omnis iste natus',
        copy: 'Sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto.'
    }
];

const Carousel = styled.div`
    padding: 120px;
    .swiper-container {
        width: 100%;
        max-width: 1600px;
        height: 600px;
        background: linear-gradient(90deg, #f58728 50%, #f9f1e4 50%);
    }
    .animate-images {
        opacity: 1;
    }
    .swiper-container-horizontal > .swiper-pagination-bullets {
        width: 50%;
        right: 0;
        left: auto;
        bottom: 56px;
        transform: translateX(20px);
    }
    .swiper-container-horizontal > .swiper-pagination-bullets .swiper-pagination-bullet {
        margin: 0 8px;
        width: 6px;
        height: 6px;
    }
    .swiper-pagination-bullet-active {
        background: #f58728;
    }
    @media (max-width: 1200px) {
        padding: 40px 16px;
        .swiper-container {
            height: 800px;
            background: linear-gradient(180deg, #f58728 50%, #f9f1e4 50%);
        }
        .swiper-container-horizontal > .swiper-pagination-bullets {
            width: 100%;
            bottom: 32px;
            transform: translateX(0);
        }
    }
`;

const CarouselContainer = () => {
    const carouselSlides = slideData.map((carouselSlide, i) => {
        return (
            <SwiperSlide key={i}>
                <CarouselSlideContainer
                    image={carouselSlide.image}
                    alt={carouselSlide.alt}
                    h1={carouselSlide.h1}
                    h2={carouselSlide.h2}
                    copy={carouselSlide.copy}
                />
            </SwiperSlide>
        );
    });

    return (
        <Carousel>
            <Swiper pagination={{ clickable: true }} loop>
                {carouselSlides}
            </Swiper>
        </Carousel>
    );
};

export default CarouselContainer;
