import React from "react";
import Img2 from "./Img2.jpg";
import Img3 from "./Img3.jpg";

const Card = ({ id, className }) => {
  let renderContent;
  if(id ==="card-one"){
      renderContent = <img src={Img2} alt="Multi Task"/>
  }

  if(id ==="card-three"){
      renderContent = <img src={Img3} alt="Check List"/>
  }
  

  return( <div id={id} className={className}>{renderContent}</div>);
};

export default Card;
