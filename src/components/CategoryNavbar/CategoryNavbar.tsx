import React from "react";
import "./CategoryNavbar.scss";

export default function CategoryNavbar({ categoryName, props }: any) {
    console.log(categoryName);
    return (
        <nav className="category-navbar">
            <button
                className="category-navbar-return-button"
                onClick={() => props.history.push("/busca")}
            >
                <i className="fas fa-arrow-left category-navbar-return-icon"></i>
            </button>
            <span>{categoryName}</span>
        </nav>
    );
}
