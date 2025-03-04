import React, { useEffect } from 'react';
import "../styles/components/KakaoMap.css";

const KakaoMap = () => {
    useEffect(() => {
        const loadKakaoMapScript = () => {
            return new Promise((resolve, reject) => {
                if (window.kakao && window.kakao.maps) {
                    resolve();
                    return;
                }

                const existingScript = document.querySelector('script[src*="dapi.kakao.com/v2/maps/sdk.js"]');
                if (existingScript) {
                    resolve();
                    return;
                }

                const script = document.createElement("script");
                script.src = "https://dapi.kakao.com/v2/maps/sdk.js?appkey=62a851e77d5721f93f4c7b9b3ea080d2&autoload=false";
                script.async = true;

                script.onload = () => {
                    if (window.kakao && window.kakao.maps) {
                        window.kakao.maps.load(() => {
                            resolve();
                        });
                    } else {
                        reject(new Error("API 로드 실패"));
                    }
                };

                script.onerror = (error) => {
                    reject(error);
                };

                document.head.appendChild(script);
            });
        };

        const initializeMap = () => {
            setTimeout(() => {
                if (!window.kakao || !window.kakao.maps) {
                    return;
                }

                const container = document.querySelector(".kakao-map");
                if (!container) {
                    return;
                }

                const options = {
                    center: new window.kakao.maps.LatLng(35.32812167724669, 129.00654705719649),
                    level: 3,
                };

                const map = new window.kakao.maps.Map(container, options);
                const marker = new window.kakao.maps.Marker({
                    position: options.center,
                });

                marker.setMap(map);
            }, 2000);
        };

        loadKakaoMapScript().then(initializeMap).catch(console.error);
    }, []);
    return (
        <div className="map-container">
            <div className="kakao-map"></div>
        </div>
    );
};

export default KakaoMap;
