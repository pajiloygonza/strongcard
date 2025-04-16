import React, { useState, useMemo, useRef } from "react";
import "./style.css";
import placesData from "../../data/data.json";
import MapCard from "../MapCard";
import MapSearch from "../MapSearch";
import {
  YMaps,
  Map as YMap,
  Placemark,
  GeolocationControl,
  ZoomControl,
  Clusterer,
  withYMaps,
} from "react-yandex-maps";

import icon1 from "../../assets/img/arrow-left-5-svgrepo-com.svg";

function MyMap({ ymaps }) {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const mapRef = useRef(null); // создаём ref для карты

  // ...existing code...
  const customMarkerLayout = useMemo(() => {
    if (!ymaps?.templateLayoutFactory) return null;
    return ymaps.templateLayoutFactory.createClass(`
      <div style="position: relative; width: 40px; height: 50px; 
                  transform: translate(-20px, -40px); 
                  cursor: pointer; 
                  pointer-events: all;">
        <div
          style="
            position: absolute;
            padding: 5px;
            top: 8px;
            left: 50%;
            transform: translate(-50%, 0%);
            display: flex;
            width: 25px;
            height: 25px;
            align-items: center;
            justify-content: center;
            background-color: white;
            border-radius: 50%;
            pointer-events: none;
          "
        >
          <img
            src="${icon1}"
            alt="icon"
            style="width: 16px; height: 16px;"
          />
        </div>
        <svg viewBox="0 0 40 50" width="40" height="50" style="pointer-events: none;">
          <circle cx="20" cy="20" r="15" fill="yellow" />
          <polygon points="20,45 6,25 34,25" fill="yellow" />
        </svg>
      </div>
    `);
  }, [ymaps]);

  const handlePlaceSelect = (geo) => {
    // ...existing code if needed...
  };

  return (
    <div className="map__container">
      {/* передаём ref в instanceRef */}
      <YMap
        defaultState={{ center: [53.9, 27.5667], zoom: 10 }}
        width="100%"
        height="600px"
        instanceRef={mapRef}
      >
        <GeolocationControl options={{ float: "left" }} />
        <ZoomControl options={{ float: "right" }} />
        <Clusterer>
          {placesData.map((place) => (
            <Placemark
              key={place.id}
              geometry={place.geo}
              properties={{
                hintContent: place.name,
                balloonContent: `<strong>${place.name}</strong><br>${place.address}`,
              }}
              options={{
                iconLayout: customMarkerLayout || "default#image",
                iconShape: {
                  type: "Circle",
                  coordinates: [10, -5],
                  radius: 25,
                },
              }}
              onClick={() => {
                console.log("Маркер кликнут:", place.name);
                setSelectedPlace(place);
                if (mapRef.current) {
                  // Зумим к координатам маркера
                  mapRef.current.setCenter(place.geo, 14, { duration: 300 });
                }
              }}
            />
          ))}
        </Clusterer>
      </YMap>

      <div className="main__map__card">
        <MapCard place={selectedPlace} />
        <MapSearch onPlaceSelect={handlePlaceSelect} />
      </div>
    </div>
  );
}

const MapWithCustomMarkers = withYMaps(MyMap, true, ["templateLayoutFactory"]);

export default function Map( {}) {
  return (
    <YMaps>
      <MapWithCustomMarkers />
    </YMaps>
  );
}