import React from "react";

const Footer = () => {
  return <footer className="footer"> 
  <p> &copy; Ju-I Kuo || Feb. 2020 </p>
  <span ><a href="https://www.freepik.com/free-photos-vectors/background">Background vector created by freepik - www.freepik.com</a></span>
  </footer>;
};

const FooterMemo = React.memo(Footer);

export default FooterMemo;
