import React, { useState, useEffect, useContext } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { FavoriteContext } from '../context/FavoriteContext';

export default function Home() {
  const { favorites, handleToggleFavorite } = useContext(FavoriteContext);
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [query] = useSearchParams();
  const nav = useNavigate();
  const queryS = query.get('search') || ' ';
  const [load, setLoad] = useState(true);

  useEffect(() => {
    if (queryS) {
      setSearchTerm(queryS.toLowerCase().trim());
      doApi(queryS.toLowerCase().trim());
    }
  }, [queryS]);

  const doApi = async (seed) => {
    const url = `https://randomuser.me/api/?results=50&seed=${seed}`;
    try {
      setLoad(true);
      const resp = await fetch(url);
      const data = await resp.json();
      setEmployees(data.results);
      setLoad(false);
    } catch (error) {
      console.log(error);
      setLoad(false);
    }
  };

  const onSearch = () => {
    nav("/?search=" + searchTerm.toLowerCase().trim());
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase().trim());
  };

  return (
    <div className="max-w-4xl text-center mx-auto p-4">
      
      <div className="text-center mb-4">
        <div>
          <img
            src="/pexels-canvastudio-3153207.jpg"
            alt="A beautiful landscape"
            style={{ width: '70%', height: '400px' }}
          />
        </div>
        <h1 className="text-2xl font-bold">Page employee {queryS}</h1>
      </div>
      <div className="flex justify-center text-center mb-4">
        <input
          type="text"
          placeholder="Search employee..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full max-w-md p-2 border border-gray-300 rounded"
        />
        <button onClick={onSearch} className="ml-2 px-4 py-2 bg-blue-500 text-black rounded">Search</button>
      </div>
      <div className="text-center mb-4">
        <Link to="/favorites" className="text-blue-500 hover:underline">Go to Favorites</Link>
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
      {load && <h3>Loading...</h3>}
        {!load && employees.map((employee, index) => (
          <li key={index} className="bg-white shadow rounded p-4 flex items-center">
            <img src={employee.picture.large} alt="employee" className="rounded-full mr-4" />
            <div className="flex-1">
              <p className="text-xl font-bold">
                <u><b>Name:</b></u> {employee.name.first} {employee.name.last}
              </p>
              <p className="text-gray-600">
                <u><b>Location:</b></u> {employee.location.city}, {employee.location.country}
              </p>
              <p className="text-gray-600">
                <u><b>Age:</b></u> {employee.dob.age}
              </p>
              <button
                onClick={() => nav(`/employee/?company=${queryS}&index=${index}`, { state: { employee } })}
                className="mt-2 px-4 py-2 bg-blue-500 text-black rounded hover:bg-blue-700"
              >
                More info
              </button>
              <button
                onClick={() => handleToggleFavorite(employee)}
                className="text-500 ml-4 px-3 py-2 rounded hover:700"
              >
                {favorites.some(fav => fav.login.uuid === employee.login.uuid) ? <FaHeart /> : <FaRegHeart />}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
