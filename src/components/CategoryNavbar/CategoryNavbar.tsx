import React from "react";
import "./CategoryNavbar.scss";

export default function CategoryNavbar({ categoryName }: any, props: any) {
    console.log(categoryName);
    return (
        <nav className="category-navbar">
            <button className="category-navbar-return-button">
                <i className="fas fa-arrow-left category-navbar-return-icon"></i>
            </button>
            <span>{categoryName}</span>
        </nav>
    );
}
