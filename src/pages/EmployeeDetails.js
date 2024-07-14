import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { FavoriteContext } from '../context/FavoriteContext';
import '../css/Details.css'; // Import the new CSS file



export default function EmployeeDetails() {
  const { state } = useLocation();
  const { employee } = state;
  const navigate = useNavigate();
  const { favorites, handleToggleFavorite } = useContext(FavoriteContext);

  const isFavorite = favorites.some(fav => fav.login.uuid === employee.login.uuid);

  const toggleFavorite = () => {
    handleToggleFavorite(employee);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 text-center">
      {employee ? (
        <div className="flex flex-col items-center">
          <img src={employee.picture.large} alt="employee" className="rounded-full mb-4" />
          <p className="text-xl font-bold">
            <u><b>Name:</b></u> {employee.name.first} {employee.name.last}
          </p>
          <p className="text-xl font-bold">
            <u><b>Age:</b></u> {employee.dob.age}
          </p>
          <p className="text-black-600">
            <u><b>Email:</b></u> {employee.email}
          </p>
          <p className="text-black-600">
            <u><b>Phone:</b></u> {employee.phone}
          </p>
          <p className="text-black-600">
            <u><b>Location:</b></u> {employee.location.street.number} {employee.location.street.name}, {employee.location.city}, {employee.location.state}, {employee.location.country}
          </p>
          <button onClick={toggleFavorite} className="px-4 py-2 bg-transparent text-black rounded">
            {isFavorite ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
          </button>
          <div className="map-container">
            <MapContainer center={[employee.location.coordinates.latitude, employee.location.coordinates.longitude]} zoom={13} style={{ height: "400px", width: "30%" }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={[employee.location.coordinates.latitude, employee.location.coordinates.longitude]} />
            </MapContainer>
          </div>
          <button onClick={() => navigate(-1)} className="mb-4 px-4 py-2 bg-blue-500 text-black rounded">Back</button>
        </div>
      ) : (
        <h3 className="text-center">No employee yet</h3>
      )}
    </div>
  );
}
