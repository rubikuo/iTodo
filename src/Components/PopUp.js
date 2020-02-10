import React from 'react';
import ReactDOM from "react-dom";

const PopUp = () => {
    return ReactDOM.createPortal(
      <div className="popUp">

      </div>
    , document.querySelector('#root'))

}

export default PopUp;