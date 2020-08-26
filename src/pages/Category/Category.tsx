import React from "react";
import CategoryNavbar from "../../components/CategoryNavbar/CategoryNavbar";
import { Store } from "../../interfaces";
import { storeMockup } from "../../mockup";
import "./Category.scss";

export default function Category(props: any) {
    const category_name = props.match.params.category_name;
    let stores = storeMockup.filter(
        (store: Store) => store.description?.toLowerCase() === category_name.toLowerCase()
    );

    function handleSelectStore(opened: any) {
        if (opened) {
            alert("yupi");
        }
    }

    return (
        <>
            <CategoryNavbar categoryName={category_name} props={props} />
            <div className="category-page-container">
                <div className="stores-container category-page-container-new">
                    {stores.map((store: Store) => (
                        <span
                            className={`store-display-container ${
                                !store.opened &&
                                "store-display-container-closed"
                            }`}
                            onClick={() => handleSelectStore(store.opened)}
                            key={Math.random()}
                        >
                            <img
                                src={store.img}
                                alt=""
                                className="store-display-img"
                            />
                            <div className="store-display-info-container">
                                <span className="store-display-title">
                                    {store.name}
                                </span>
                                <div className="store-display-info-description-distance">
                                    {store.description} - {store.distance}km
                                </div>
                                <div
                                    className="store-display-info-description-distance
              store-display-info-align-delivery"
                                >
                                    {store.delivery_fee ? (
                                        <span>
                                            R${" "}
                                            {store.delivery_fee &&
                                                store.delivery_fee.toFixed(2)}
                                        </span>
                                    ) : (
                                        <span>Entrega Grátis</span>
                                    )}
                                </div>
                            </div>
                        </span>
                    ))}
                </div>
            </div>
        </>
    );
}
