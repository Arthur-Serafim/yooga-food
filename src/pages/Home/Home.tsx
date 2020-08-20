import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Home.scss";
import { storeMockup } from "../../mockup";
import { Store } from "../../interfaces";

export default function Home(props: any) {
    function handleSelectStore(opened: any) {
        if (opened) {
            alert("yupi");
        }
    }

    return (
        <div className="home-page-container">
            <div className="stores-container">
                {storeMockup.map((store: Store) => (
                    <span
                        className={`store-display-container ${
                            !store.opened && "store-display-container-closed"
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
            <Navbar props={props} />
        </div>
    );
}
