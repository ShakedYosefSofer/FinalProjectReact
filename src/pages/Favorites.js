import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { FavoriteContext } from '../context/FavoriteContext';

export default function Favorites() {
  const { favorites, handleToggleFavorite } = useContext(FavoriteContext);
  const nav = useNavigate();

  return (
    <div className='container text-center mx-auto p-4'>
      <br />
      <h1 className='text-3xl font-bold text-center'><u>Favorites</u></h1>
      <br />
      {favorites.length > 0 ? (
        <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4'>
          {favorites.map((fav, index) => (
            <li key={fav.login.uuid} className='bg-white shadow rounded p-4 flex items-center'>
              <img src={fav.picture.large} alt="employee" className='rounded-full mr-4 w-24 h-24' />
              <div className='flex-1'>
                <p className='text-xl font-bold'>
                  <u><b>Name:</b></u> {fav.name.first} {fav.name.last}
                </p>
                <p className='text-gray-600'>
                  <u><b>Age:</b></u> {fav.dob.age}
                </p>
                <p className='text-gray-600'>
                  <u><b>Location:</b></u> {fav.location.street.number} {fav.location.street.name}, {fav.location.city}, {fav.location.state}, {fav.location.country}
                </p>
                <button
                  onClick={() => nav(`/Favorites/employee?index=${index}`, { state: { employee: fav } })}
                  className="mt-2 px-4 py-2 bg-blue-500 text-black rounded hover:bg-blue-700"
                >
                  More Info
                </button>
                <button
                  onClick={() => handleToggleFavorite(fav)}
                  className="ml-4 px-3 py-2 rounded hover:bg-gray-200"
                >
                  {favorites.some(employee => employee.login.uuid === fav.login.uuid) ? <FaHeart /> : <FaRegHeart />}
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <h3 className='text-center'>No favorites yet</h3>
      )}
    </div>
  );
}
