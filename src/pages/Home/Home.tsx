import React, { useState, useEffect } from "react";
import "./Home.scss";
import { Store } from "../../interfaces";
import StoreService from "../../services/stores";
import Navbar from '../../components/Navbar/Navbar'

export default function Home(props: any) {
    let [location, setLocation] = useState({
        latitude: 0,
        longitude: 0,
        allowed: false,
    });
    let [store, setStore] = useState([])
    let [storeToSearch, setStoreToSearch] = useState([])
    const storeService = new StoreService()

    useEffect(() => {
        if (!location.allowed) {
            getLocation()
        } else {
            (async () => {
                let res = await storeService.loadStore(location.latitude, location.longitude)
                setStoreToSearch(res.data)
                setStore(res.data)
            })()
        }
        // eslint-disable-next-line
    }, []);

    function retira_acentos(str: any) {
        let com_acento =
            "ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝŔÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿŕ";
        let sem_acento =
            "AAAAAAACEEEEIIIIDNOOOOOOUUUUYRsBaaaaaaaceeeeiiiionoooooouuuuybyr";
        let novastr = "";

        for (let i = 0; i < str.length; i++) {
            let troca = false;
            for (let a = 0; a < com_acento.length; a++) {
                if (str.substr(i, 1) === com_acento.substr(a, 1)) {
                    novastr += sem_acento.substr(a, 1);
                    troca = true;
                    break;
                }
            }
            if (troca === false) {
                novastr += str.substr(i, 1);
            }
        }
        return novastr;
    }

    function handleSearch(e: any) {
        if (e.target.value === '') {
            setStoreToSearch(store);
        } else {
            let filtered: any = store.filter((item: any) =>
                retira_acentos(item.name?.toLowerCase()).includes(
                    retira_acentos(e.target.value.toLowerCase())
                )
            );
            setStoreToSearch(filtered);
        }
    }

    function handleSelectStore(opened: any, url: any) {
        if (opened) {
            window.open(`https://yooga.com.br/delivery/${url}`)
        }
    }

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
                    setStoreToSearch(res.data)
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
            <Navbar />
            <div className="search-page-container">
                {location.allowed ? (
                    <>
                        <input
                            type="text"
                            className="search-page-input"
                            placeholder="Procure por loja"
                            onChange={(e) => handleSearch(e)}
                        />
                        <h2 className="search-page-title">Lojas perto de você!</h2>
                        <div className="stores-container">
                            {storeToSearch.map((item: Store) => (
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
                    </>
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
