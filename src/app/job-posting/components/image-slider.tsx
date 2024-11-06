"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Image from "next/image";
import React from "react";
import ShareButton from "@/components/buttons/share-button";
import Slider from "react-slick";
import pxToVw from "@/lib/dpi-converter";
import styled from "styled-components";

const StoreImage = styled(Image)`
  width: ${pxToVw(390)};
  height: ${pxToVw(390)};
  object-fit: cover;
`;

const SliderContainer = styled.div`
  position: relative;

  .slick-dots {
    position: absolute;
    bottom: 20px; /* 슬라이드 이미지 위에 위치시키기 위한 위치 조정 */
    left: 50%;
    transform: translateX(-50%);
    display: flex !important;
    justify-content: center;
    gap: 8px;

    li {
      margin: 0;
    }

    button::before {
      font-size: 12px;
      color: white; /* 점 색상 변경 */
    }
  }
`;

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

interface ImageSliderProps {
  images: string[];
}

const ImageSlider = ({ images }: ImageSliderProps) => {
  if (images.length === 1) {
    return (
      <SliderContainer>
        <StoreImage src={images[0]} alt="Slide 0" width={390} height={390} />
        <ShareButton />
      </SliderContainer>
    );
  }

  return (
    <SliderContainer>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <StoreImage
              src={image}
              alt={`Slide ${index}`}
              width={390}
              height={360}
            />
          </div>
        ))}
      </Slider>
      <ShareButton />
    </SliderContainer>
  );
};

export default ImageSlider;
