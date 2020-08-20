import React from "react";
import { NavLink } from "react-router-dom";

import "./Navbar.scss";

export default function Navbar({ props }: any) {
    return (
        <nav className="navbar-component-container">
            <NavLink
                className="navbar-component-items link"
                exact
                to="/"
                activeClassName="navbar-component-items-active"
            >
                <i className="fas fa-home navbar-component-item-icon" />
                <span className="navbar-component-item-title">Início</span>
            </NavLink>
            <NavLink
                className="navbar-component-items link"
                exact
                to="/busca"
                activeClassName="navbar-component-items-active"
            >
                <i className="fas fa-search navbar-component-item-icon" />
                <span className="navbar-component-item-title">Buscar</span>
            </NavLink>
        </nav>
    );
}
