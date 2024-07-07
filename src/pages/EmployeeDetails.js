import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';

export default function EmployeeDetails() {
  const { state } = useLocation();
  const { employee } = state;
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto p-4">
      <button onClick={() => navigate(-1)} className="mb-4 px-4 py-2 bg-blue-500 text-white rounded">Back</button>
      <div className="flex flex-col items-center">
        <img src={employee.picture.large} alt="employee" className="rounded-full mb-4" />
        <p className="text-xl font-bold">
          <u><b>Name:</b></u> {employee.name.first} {employee.name.last}
        </p>
        <p className="text-gray-600">
          <u><b>Age:</b></u> {employee.dob.age}
        </p>
        <p className="text-gray-600">
          <u><b>Location:</b></u> {employee.location.city}, {employee.location.country}
        </p>
        <p className="text-gray-600">
          <u><b>Email:</b></u> {employee.email}
        </p>
        <p className="text-gray-600">
          <u><b>Phone:</b></u> {employee.phone}
        </p>
        <MapContainer center={[employee.location.coordinates.latitude, employee.location.coordinates.longitude]} zoom={13} style={{ height: "400px", width: "100%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[employee.location.coordinates.latitude, employee.location.coordinates.longitude]} />
        </MapContainer>
      </div>
    </div>
  );
}
