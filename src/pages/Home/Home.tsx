import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Home.scss";
import { Store } from "../../interfaces";

export default function Home(props: any) {
    let storesMockup: Array<Store> = [
        {
            name: "Lanchonete Bam Bam",
            img:
                "https://media-cdn.tripadvisor.com/media/photo-s/12/71/44/a3/logo-da-lanchonete.jpg",
            opened: true,
            delivery_fee: 5.99,
            distance: 6.5,
            description: "Lanchonete",
        },
    ];

    return (
        <div className="home-page-container">
            <div className="store-display-container">
                {storesMockup.map((store) => (
                    <>
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
                                R${" "}
                                {store.delivery_fee &&
                                    store.delivery_fee.toFixed(2)}
                            </div>
                        </div>
                    </>
                ))}
            </div>
            <Navbar props={props} />
        </div>
    );
}
