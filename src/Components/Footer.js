import React from 'react';

const Footer = () =>{
  return(
      <footer className="footer">&copy; Ju-I Kuo || Feb. 2020 </footer>
  )

  
  }


  const FooterMemo = React.memo(Footer);

  export default FooterMemo;