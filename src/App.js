import "./App.css";
import React, { useEffect, useState } from "react";
import { Marker } from "react-leaflet/Marker";
import { Popup } from "react-leaflet/Popup";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import { useMapEvents } from "react-leaflet/hooks";
import { Button } from "@mui/material/";
import nextId from "react-id-generator";

function App() {
  const [markers, setMarkers] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editMarkerId, setEditMarkerId] = useState(null);
  function MyComponent() {
    const map = useMapEvents({
      dblclick: (e) => {
        setMarkers((markers) => [
          ...markers,
          {
            lat: e.latlng.lat,
            lng: e.latlng.lng,
            text: "I am a marker!",
            id: nextId(),
          },
        ]);
      },
    });

    return null;
  }

  const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/107/107831.png",
    iconSize: [25, 25],
  });

  const handleSubmit = (id) => {
    setMarkers(
      markers.map((marker) =>
        marker.id === id ? { ...marker, text: inputValue } : marker
      )
    );
    setEditMarkerId(null);
  };

  const clickEditMarker = (id) => {
    setEditMarkerId(id);
    setInputValue(markers.find((marker) => marker.id === id).text);
  };

  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      scrollWheelZoom={true}
      doubleClickZoom={false}
    >
      <MyComponent />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.map((position) => (
        <Marker
          icon={customIcon}
          position={[position.lat, position.lng]}
          key={position.id}
        >
          <Popup closeOnClick={false}>
            {editMarkerId === position.id ? (
              <form onSubmit={() => handleSubmit(position.id)}>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <Button type="submit">Submit</Button>
              </form>
            ) : (
              <>
                {position.text}
                <Button onClick={() => clickEditMarker(position.id)}>
                  Edit
                </Button>
              </>
            )}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
export default App;
