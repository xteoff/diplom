'use client'
import Slider from "react-slick";
import ProductCard from "../ProductCard/product_card";
import { MouseEventHandler } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function SampleNextArrow(props: any) {
    const { className, style, onClick } = props;
    return (
        <div
            className="absolute top-50 bottom-0 my-auto right-12 before:text-2xl before:content-['→'] before:text-red-950 z-10"
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props: any) {
    const { className, style, onClick } = props;
    return (
      <div
        className=" absolute top-50 bottom-0 my-auto left-12 before:content-['←'] before:text-2xl before:text-red-950 z-10"
        onClick={onClick}
      />
    );
  }


function SliderAng(){
    // const settings = {

        // className: "container mx-auto",

        // responsive: [
        //     {
        //       breakpoint: 1024,
        //       settings: {
        //         slidesToShow: 3,
        //         slidesToScroll: 3,
        //         infinite: true,
        //         dots: true
        //       }
        //     },
        //     {
        //       breakpoint: 800,
        //       settings: {
        //         slidesToShow: 2,
        //         slidesToScroll: 2,
        //         initialSlide: 2,
        //         infinite: true,
        //         dots: true
        //       }
        //     },
        //     {
        //       breakpoint: 480,
        //       settings: {
        //         slidesToShow: 1,
        //         slidesToScroll: 1,
        //         infinite: true,
        //         dots: true
        //       }
        //     }
        // ]
    // };

      const settings = {
        dots: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 5,
                slidesToScroll: 3,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 800,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
                dots: true
              }
            }
        ]
        // centerMode: true,  // Включает центрирование слайда
        // centerPadding: '0', // Убирает отступы по бокам
        
    };

    const slides = [
        1,
        2,
        3, 
        4,
        5,
        2,
        3,
        4,
        5,
        2,
        3,
        4,
        5,
    ];

    return(
        <>
            <h1 className="text-center font-extralight text-4xl pb-5">Новинки</h1>
            <div className="slider-container relative">
                <Slider {...settings}>
                    {
                        slides.map(() => {
                            return(
                                <div key={1} className="px-2">
                                    <div className="flex justify-center">
                                        <ProductCard 
                                            img1="/Angels/палетка.webp" 
                                            img2="/Angels/палетка_от.svg" 
                                            text="9-Color Eyeshadow Palette" 
                                            price="₽ 4 150"
                                        />
                                    </div>
                                </div>
                            )
                        })
                    }
                </Slider>
            </div>


        </>
    )
}

function Slide({ children }:{children:any}) {
    return (
        <div className=" flex justify-center">
            {children}
        </div>
    );
}

export default SliderAng;