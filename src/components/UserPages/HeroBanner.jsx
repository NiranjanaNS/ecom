import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HeroBanner = () => {
  const settings = {
    centerMode: true,
    centerPadding: "200px",
    slidesToShow: 1,
    infinite: true,
    speed: 600,
    arrows: true,
    dots: true,
    responsive: [
      { breakpoint: 1280, settings: { centerPadding: "100px" } },
      { breakpoint: 1024, settings: { centerPadding: "50px" } },
      { breakpoint: 768, settings: { centerPadding: "20px" } },
    ],
  };

  const images = [
    "https://picsum.photos/1200/400?random=1",
    "https://picsum.photos/1200/400?random=2",
    "https://picsum.photos/1200/400?random=3",
  ];

  return (
    <div className="w-full py-6 bg-gray-100">
      <Slider {...settings}>
        {images.map((url, id) => (
          <div key={id} className="px-4">
            <img
              src={url}
              alt={`banner-${id}`}
              className="w-full h-80 object-cover rounded-lg shadow-md"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HeroBanner;
