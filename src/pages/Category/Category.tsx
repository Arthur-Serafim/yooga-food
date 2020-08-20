import React from "react";
import CategoryNavbar from "../../components/CategoryNavbar/CategoryNavbar";

export default function Category(props: any) {
    const category_name = props.match.params.category_name;
    return (
        <div>
            <CategoryNavbar categoryName={category_name} />
            <h2>{category_name}</h2>
        </div>
    );
}
