import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Home.scss";
// import { storeMockup } from "../../mockup";
import { Store } from "../../interfaces";
import StoreService from '../../services/stores'

export default function Home(props: any) {
    let [location, setLocation] = useState({
        latitude: 0,
        longitude: 0,
        allowed: false,
    });
    let [store, setStore] = useState([])
    const storeService = new StoreService

    function handleSelectStore(opened: any, url: any) {
        if (opened) {
            window.open(`https://yooga.com.br/delivery/${url}`)
        }
    }

    useEffect(() => {
        if (!location.allowed) {
            getLocation()
        } else {
            (async () => {
                console.log(location)
                let res = await storeService.loadStore(location.latitude, location.longitude)
                setStore(res.data)
            })()
        }
    }, []);

    function getLocation() {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                setLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    allowed: true,
                });

                (async () => {
                    let res = await storeService.loadStore(position.coords.latitude, position.coords.longitude)
                    setStore(res.data)
                })()
            },
            (err) => {
                setLocation({
                    latitude: 0,
                    longitude: 0,
                    allowed: false,
                });
            }
        );
    }

    return (
        <div className="home-page-container">
            {store ? (
                <div className="stores-container">
                    <h2 className="search-page-title">Lojas perto de você!</h2>
                    {store.map((item: Store) => (
                        <span
                            className={`store-display-container ${
                                !item.opened &&
                                "store-display-container-closed"
                                }`}
                            onClick={() => handleSelectStore(item.opened, item.url)}
                            key={Math.random()}
                        >
                            <img
                                src={item.img ? item.img : 'https://www.bauducco.com.br/wp-content/uploads/2017/09/default-placeholder-1-2.png'}
                                alt=""
                                className="store-display-img"
                            />
                            <div className="store-display-info-container">
                                <span className="store-display-title">
                                    {item.name}
                                </span>
                                <div className="store-display-info-description-distance">
                                    {item.description}  {item.distance && `- ${item.distance?.toFixed(2)} km`}
                                </div>
                                <div
                                    className="store-display-info-description-distance
                    store-display-info-align-delivery"
                                >
                                    {item.delivery_fee ? (
                                        <span>
                                            R${" "}
                                            {item.delivery_fee &&
                                                item.delivery_fee.toFixed(2)}
                                        </span>
                                    ) : (
                                            <span>Entrega Grátis</span>
                                        )}
                                </div>
                            </div>
                        </span>
                    ))}
                </div>
            ) : (
                    <div className="no-location" onClick={getLocation}>
                        Ative a localização para ver lojas perto de ti.
                    </div>
                )}
            <Navbar props={props} />
        </div>
    );
}
