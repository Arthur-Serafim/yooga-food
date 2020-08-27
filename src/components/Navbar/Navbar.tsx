import React from "react";
import YoogaLogo from '../../assets/YoogaMicroLogo.png'
import "./Navbar.scss";

export default function Navbar() {
    return (
        <nav className="navbar-component-container">
            <img src={YoogaLogo} alt="Logo yooga" />
            <span className="navbar-component-title">Yooga Marketplace</span>
        </nav>
    );
}
