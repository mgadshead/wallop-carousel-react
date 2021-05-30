import { useState, useEffect } from 'react';
import styled from 'styled-components';

const CarouselSlide = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    @media (max-width: 1200px) {
        flex-direction: column;
        height: 100%;
    }
`;

const Left = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    @media (max-width: 1200px) {
        width: 100%;
        height: 400px;
    }
`;

const ImageContainer = styled.div`
    height: calc(100% - 80px);
    width: 100%;
    @media (max-width: 1200px) {
        height: 100%;
        padding: 0 24px;
    }
`;

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform: translateX(40px);
    opacity: 0;
    transition: opacity 0.4s;
    @media (max-width: 1200px) {
        transform: translateX(0) translateY(24px);
    }
    &.animate-images {
        opacity: 1;
    }
`;

const Right = styled.div`
    height: calc(100% - 80px);
    width: 50%;
    padding: 0px 40px 0px 80px;
    margin: 40px 0;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #616364;
    background: #f9f1e4;
    text-align: center;
    @media (max-width: 1200px) {
        width: 100%;
        height: 320px;
        padding-left: 40px;
    }
`;

const ContentContainer = styled.div`
    opacity: 0;
    transition: opacity 0.4s;
    &.fonts-loaded {
        opacity: 1;
    }
`;

const TopTitle = styled.h1`
    font-family: Montserrat, sans-serif;
    text-transform: uppercase;
    font-size: 16px;
    letter-spacing: 0.4px;
    margin: 0 0 16px 0;
    max-width: 336px;
    @media (max-width: 1200px) {
        font-size: 12px;
        max-width: none;
    }
`;

const BottomTitle = styled.h2`
    font-family: Oswald, sans-serif;
    text-transform: uppercase;
    font-size: 40px;
    font-weight: 500;
    letter-spacing: 0.4px;
    margin: 0 0 24px 0;
    max-width: 336px;
    @media (max-width: 1200px) {
        font-size: 24px;
        margin-bottom: 16px;
        max-width: none;
    }
`;

const Copy = styled.p`
    margin: 0 0 24px 0;
    font-family: 'EB Garamond', serif;
    line-height: 1.4;
    font-size: 20px;
    max-width: 360px;
    @media (max-width: 1200px) {
        font-size: 18px;
        line-height: 1.2;
        max-width: none;
    }
`;

const Button = styled.button`
    background: transparent;
    border: none;
    a {
        color: #fff;
        background: #474747;
        text-decoration: none;
        font-family: Montserrat, sans-serif;
        text-transform: uppercase;
        font-size: 14px;
        padding: 0 8px;
        height: 56px;
        line-height: 56px;
        display: block;
        letter-spacing: 0.4px;
        position: relative;
        transition: all 0.24s;
        &::before,
        &:after {
            content: '';
            width: 56px;
            height: 56px;
            border-radius: 50%;
            background: #474747;
            position: absolute;
            top: 0;
        }
        &::before {
            left: -28px;
        }
        &::after {
            right: -28px;
        }
        span {
            position: relative;
            z-index: 1;
        }
        &:hover {
            opacity: 0.8;
        }
    }
`;

const CarouselSlideContainer = props => {
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const [imagesLoaded, setImagesLoaded] = useState(false);

    // Check if the fonts are loaded to avoid a flicker when they change
    const checkFontsLoaded = () => {
        // This is a new feature so check if the user's browser supports it
        if (typeof document.fonts.ready.then === 'function') {
            // Return a promise when all the fonts are loaded
            document.fonts.ready.then(() => {
                // Show text
                setFontsLoaded(true);
            });
            // If it isn't supported show the fonts anyway, better a flicker than no text
        } else {
            //Show text
            setFontsLoaded(true);
        }
    };

    checkFontsLoaded();

    useEffect(() => {
        // Wait for images to load so we can add a class to animate them in nicely
        let images = document.querySelectorAll('img');
        let totalImages = document.querySelectorAll('img').length;
        let imagesLoaded = 0;

        // Count loaded dummy images (created below) to know when to animate the images
        const dummyImageHandler = () => {
            imagesLoaded++;
            if (imagesLoaded == totalImages) {
                setImagesLoaded(true);
            }
        };

        // Create dummy images to download in case the browser has downloaded them before we get here
        Array.prototype.forEach.call(images, function (image) {
            let dummyImage = document.createElement('img');
            dummyImage.addEventListener('load', dummyImageHandler);
            let src = image.getAttribute('src');
            dummyImage.setAttribute('src', src);
        });
    });

    return (
        <CarouselSlide>
            <Left>
                <ImageContainer>
                    <Image
                        className={fontsLoaded && imagesLoaded ? 'animate-images' : ''}
                        src={props.image}
                        alt={props.alt}
                    />
                </ImageContainer>
            </Left>
            <Right>
                <ContentContainer className={fontsLoaded && imagesLoaded ? 'fonts-loaded' : ''}>
                    <TopTitle>{props.h1}</TopTitle>
                    <BottomTitle>{props.h2}</BottomTitle>
                    <Copy>{props.copy}</Copy>
                    <Button>
                        <a href='https://wallop.ca/' target='_blank' rel='noreferrer'>
                            <span>View Activities</span>
                        </a>
                    </Button>
                </ContentContainer>
            </Right>
        </CarouselSlide>
    );
};

export default CarouselSlideContainer;
