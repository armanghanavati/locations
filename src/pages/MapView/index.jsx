import React, { useCallback, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { Button, Col } from "react-bootstrap";
import vehicles from "../../utils/allData";

const Index = () => {
  const position = [53.63382777, 10.0071494];
  const [map, setMap] = useState(null);
  const allVehicles = Object.values(vehicles)?.map((vehicle) => {
    return vehicle;
  });

  const ZoomToMarker = ({ vehicle, idx }) => {
    const map = useMap();
    const handleClick = () => {
      map.flyTo(
        [vehicle.geoCoordinate.latitude, vehicle.geoCoordinate.longitude],
        18,
        {
          animate: true,
          duration: 1.5,
        }
      );
    };
    return (
      <Marker
        position={[
          vehicle.geoCoordinate.latitude,
          vehicle.geoCoordinate.longitude,
        ]}
        // icon={activeMarker === idx ? highlightedIcon : defaultIcon}
        eventHandlers={{ click: handleClick }}>
        <Popup>
          <div>address: {vehicle?.address}</div>
          <div>plate: {vehicle?.plate}</div>
        </Popup>
      </Marker>
    );
  };

  const onClick = useCallback(() => {
    map.setView(position, 13);
  }, [map]);

  return (
    <>
      <Button
        variant="light"
        className="position-absolute w-25"
        style={{ zIndex: "999999999999999", top: "10px", left: "38%" }}
        onClick={onClick}>
        Reset
      </Button>
      <div className="d-flex position-ralative justify-content-center">
        <MapContainer
          center={position}
          zoom={13}
          ref={setMap}
          scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {allVehicles?.map((vehicle, index) => (
            <ZoomToMarker
              key={vehicle?.locationId}
              vehicle={vehicle}
              index={index}
            />
          ))}
        </MapContainer>
      </div>
    </>
  );
};

export default Index;
