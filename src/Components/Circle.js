import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";



const Circle = ({ id, className, todos, checkItemAmount }) => {
  let renderContent;
  let todosAmount = todos.length;
  const percentage1 = todosAmount / 100;
  const percentage2 = checkItemAmount / 100;
  let percentage3;
  if(todosAmount === 0){
    percentage3 = 0;
  }else{
   percentage3 = checkItemAmount * 100 / todosAmount;
  }
  console.log(checkItemAmount)




  // to show how many items in todos
  if (id === "circle-one") {
    renderContent = (
      <CircularProgressbar
        value={percentage1}
        id={id}
        className={className}
        text={`${todosAmount} Todos`}
      />
    );
  }

  //to show how many items has been done
  if (id === "circle-two") {
    renderContent = (
      <CircularProgressbar
        value={percentage2}
        id={id}
        className={className}
        text={`${checkItemAmount} Done`}
      />
    );
  }

  // to show how much has been fulfillment
  if (id === "circle-three") {
    renderContent = (
      <CircularProgressbar 
        value={percentage3}
        id={id}
        className={className}
        text={`${percentage3} %`}
      />
    );
  }
  return <>{renderContent}</>;
};

export default Circle;
