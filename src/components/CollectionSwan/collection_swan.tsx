'use client'
import Slider from "react-slick";
import ProductCard from "../ProductCard/product_card";
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


function CollectionSwan(){
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
            {/* <div className="flex justify-center h-fit pb-5">
              <img src="/Swan_banner.svg" alt="" />
            </div> */}
            <div className="slider-container relative mb-10">
                <Slider {...settings}>
                    {
                        slides.map(() => {
                            return(
                                <div key={1} className="px-2">
                                    <div className="flex justify-center">
                                        <ProductCard 
                                            img1="/Swan/палетка.webp" 
                                            img2="/Swan/палетка_от.svg" 
                                            text="6-Color Eyeshadow Palette" 
                                            price="₽ 3 200"
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

export default CollectionSwan;