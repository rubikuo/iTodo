import React from "react";
import Img1 from "./Img1.jpg";
import Img2 from "./Img2.jpg";
import Img3 from "./Img3.jpg";

const Card = ({ id, className }) => {
  let renderContent;
  if (id === "card-one") {
    renderContent = <img src={Img1} alt="Multi Task" />;
  } else if (id === "card-two") {
    renderContent = <img src={Img2} alt="Check List" />;
  } else if (id === "card-three") {
    renderContent = <img src={Img3} alt="Check List" />;
  }

  return (
    <div id={id} className={className}>
      {renderContent}
    </div>
  );
};

export default Card;
