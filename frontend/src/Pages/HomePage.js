import React, { useEffect, useState } from "react";
import Banner from "../Components/Layout/Banner/Banner";
import Feature from "../Components/Layout/Features/Feature";
import Hero from "../Components/Layout/Hero/Hero";
import Layout from "../Components/Layout/Layout";
import NewsLetter from "../Components/Layout/NewsLetter/NewsLetter";
import ProductContainer from "../Components/ProductContainer/ProductContainer";
// import Filter from "../Components/Filter";

const HomePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // const [filter, setFilter] = useState("");
  return (
    <Layout title="Home - Cara" description="Home Cara" author="shobhit pandey">
      <Hero />
      <Feature />
      {/* <Filter onFilterChange={(e) => setFilter(e.target.value)}/> */}
      <ProductContainer />
      <NewsLetter />
      <Banner />
    </Layout>
  );
};

export default HomePage;
