import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Circle = ({ id, className, todos }) => {
  let renderContent;
  let todosAmount = todos.length;
  const percentage1 = todosAmount / 100;

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

  if (id === "circle-two") {
    renderContent = (
      <CircularProgressbar
        value={percentage1}
        id={id}
        className={className}
        text={`${todosAmount} Done`}
      />
    );
  }


  if (id === "circle-three") {
    renderContent = (
      <CircularProgressbar
        value={percentage1}
        id={id}
        className={className}
        text={`${todosAmount} %`}
      />
    );
  }

  return <>{renderContent}</>;
};

export default Circle;
