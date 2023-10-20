import React, { useEffect, useState } from "react";
import Slider from "../Components/slider";
import Header from "../Components/header";
import NoLogin from "../Components/nologin";
import Footer from "../Components/footer";
import Card from "../Components/card";

const Home = () => {
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLogin(true);
    }
  }, []);
  return (
    <>
      <Header />
      {isLogin ? (
        <div>
          <Slider />
          <div className="home container">
            <div className="d-flex  justify-content-between  align-items-center">
              <h1>Popular Movie</h1>
              <h3 className="see">See All Movie</h3>
            </div>
            <div className="row  row-cols-4">
              <Card />
            </div>
          </div>
        </div>
      ) : (
        <div className="Container nl-con d-flex justify-content-around  align-items-center bg-dark text-light">
          <NoLogin />
        </div>
      )}
      <Footer />
    </>
  );
};

export default Home;
