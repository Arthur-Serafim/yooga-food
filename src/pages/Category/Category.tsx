import React, { useState, useEffect } from "react";
import CategoryNavbar from "../../components/CategoryNavbar/CategoryNavbar";
import { Store } from "../../interfaces";
import "./Category.scss";
import StoreService from "../../services/stores";

export default function Category(props: any) {
    const category_name = props.match.params.category_name;
    let [location, setLocation] = useState({
        latitude: 0,
        longitude: 0,
        allowed: false,
    });
    let [store, setStore] = useState([])
    const storeService = new StoreService()

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
                let res = await storeService.loadCategory(location.latitude, location.longitude, category_name)
                setStore(res.data)
            })()
        }
        // eslint-disable-next-line
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
        <>
            <CategoryNavbar categoryName={category_name} props={props} />
            <div className="category-page-container">
                {store && location.allowed ? (
                    <div className="stores-container category-page-container-new">
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
                                    <div className="store-display-title">
                                        {item.name}
                                    </div>
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
                        <div className="home-page-container">
                            <div className="no-location" onClick={getLocation}>
                                Ative a localização para ver lojas perto de ti.
                            </div>
                        </div>
                    )}
            </div>
        </>
    );
}
