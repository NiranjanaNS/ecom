import React from "react";
import UserLayout from "../Layout/UserLayout"
import HeroBanner from "./HeroBanner";
import Category from "./Category";
import Banner from "./Banner";

const LandingPage = () => {
  return (
    
    <UserLayout className="overflow-hidden">
      <Banner />
      <HeroBanner />
      <Category />
    </UserLayout>
    
  );
};

export default LandingPage;