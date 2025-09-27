import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Import images
import img1 from '../../assets/c6bb8ead-ef56-4206-914f-f307877ac55a.jpg';
import img2 from '../../assets/c6bb8ead-ef56-4206-914f-f307877ac55a.jpg';
import img3 from '../../assets/164bcf42-ff2f-454a-b671-02b8aa6eb433.jpg';

const HeroBanner = () => {
  const settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    arrows: true,
    dots: true,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  const images = [
    { url: img1, text: "Big Sale Today!" },
    { url: img2, text: "Best Products for You!" },
    { url: img3, text: "Exclusive Deals!" },
  ];

  return (
    <div className="w-full py-2 bg-gray-100 flex justify-center">
      <Slider {...settings} className="w-full">
        {images.map((img, id) => (
          <div key={id} className="flex justify-center ">
            <div className="w-full flex justify-center items-center bg-gray-300 p-4 rounded-lg shadow-md overflow-hidden relative">
              <img
                src={img.url}
                alt={`banner-${id}`}
                className="w-full h-max max-w-3xl rounded-2xl object-cover"
              />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-3xl font-bold text-center">
                {img.text}
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HeroBanner;
