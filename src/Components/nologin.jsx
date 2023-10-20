import React from "react";
import image1 from "../Images/image1.png";
import image2 from "../Images/image2.png";

const NoLogin = () => {
  return (
    <>
      <div className="nl-content ps-4">
        <h1>
          Welcome To <span className="h-logo">Movielist</span>{" "}
        </h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur recusandae est nam beatae temporibus, repudiandae modi quis, fugit doloribus tempora earum cupiditate quod? Quasi dicta amet, architecto ratione est similique!
        </p>

        <h1>Please Login to Continue</h1>
      </div>
      <div className="nl-content">
        <div className="d-flex flex-column align-items-center bg-secondary-subtle">
          <img src={image2} alt="" />
          <img src={image1} alt="" />
        </div>
      </div>
    </>
  );
};

export default NoLogin;
