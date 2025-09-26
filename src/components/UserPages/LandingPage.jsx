import React from "react";
import UserLayout from "../Layout/UserLayout";
import NavBar from "./Navbar";
import HeroBanner from "./HeroBanner";
import Category from "./Category";
import BlackFridayIllustration from "./BlackFridayIllustration";

const LandingPage = () => {
  return (
    <UserLayout>
      <NavBar />
      <BlackFridayIllustration />
      <HeroBanner />
      <Category />
    </UserLayout>
  );
};

export default LandingPage;
