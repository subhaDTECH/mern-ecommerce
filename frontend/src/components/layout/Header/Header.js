import React from 'react'
import {ReactNavbar} from "overlay-navbar"


const options = {
    burgerColorHover: "#8bbe1b",
    burgerColor: "#8bbe1b",
    logo:"https://tse4.mm.bing.net/th?id=OIP.S1EeMq54Fkyp4SgZrSW2-QHaE8&pid=Api&P=0",
    logoWidth: "20vmax",
    navColor1: "white",
    logoHoverSize: "10px",
    logoHoverColor: "#8bbe1b",
    link1Text: "Home",
    link2Text: "Products",
    link3Text: "Contact",
    link4Text: "About",
    link1Url: "/",
    link2Url: "/products",
    link3Url: "/contact",
    link4Url: "/about",
    link1Size: "1.3vmax",
    link1Color: "#333d1e",
    nav1justifyContent: "flex-end",
    nav2justifyContent: "flex-end",
    nav3justifyContent: "flex-start",
    nav4justifyContent: "flex-start",
    link1ColorHover: "#8bbe1b",
    link1Margin: "1vmax",
    profileIconUrl: "/login",
    profileIconColor: "#8bbe1b",
    searchIconColor: "#8bbe1b",
    cartIconColor: "#8bbe1b",
    profileIconColorHover:"#8bbe1b", 
    searchIconColorHover: "#8bbe1b",
    cartIconColorHover: "#8bbe1b",
    cartIconMargin: "1vmax",
  };

const Header = () => {
    return (
        <>
         <ReactNavbar {...options}/>
            
        </>
    )
}

export default Header
