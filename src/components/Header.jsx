import React from 'react'
import logo from '../assets/logo.jpg'

//We can also set a default title or subtitle so that if no one provides a prop, the same default text is displayed.
const Header = ({title = 'Meet Your Finnacial Investment', subtitle = "Start your Investment"}) => {
  return (
    <header id="header">
      <img src={logo}/>
      <h1>{title}</h1>
      <h2>{subtitle}</h2>
    </header>
  );
};

export default Header;
