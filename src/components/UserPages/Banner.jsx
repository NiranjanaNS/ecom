import React from "react";
import bannerImg from "../../assets/164bcf42-ff2f-454a-b671-02b8aa6eb433.jpg";

const Banner = () => {
  return (
    <div className="w-full flex justify-center items-center bg-gray-300 rounded-2xl p-6 relative">
      <img
        src={bannerImg}
        alt="Black Friday Sale"
        className="w-full h-max max-w-5xl rounded-2xl object-cover"
      />

      <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Black Friday Mega Sale!</h1>
        <p className="text-lg md:text-2xl">Up to 70% off on all products. Limited time only!</p>
      </div>
    </div>
  );
};

export default Banner;
