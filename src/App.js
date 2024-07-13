import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Home from "./pages/Home";
import Header1 from "./components/Header";
import EmployeeDetails from './pages/EmployeeDetails';
import Favorites from "./pages/Favorites";
import FavoritesDetails from './pages/FavoritesDetails'; 
import { FavoriteProvider } from './context/FavoriteContext';
import Page404 from "./pages/Page404";

function App() {
  return (
    <FavoriteProvider>
      <BrowserRouter>
        <Header1 />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/employee" element={<EmployeeDetails />} /> {/* שינוי כאן לנתיב החדש */}
          <Route path="/Favorites/employee" element={<FavoritesDetails />} /> {/* נתיב חדש ל-FavoritesDetails */}
          <Route path="*" element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    </FavoriteProvider>
  );
}

export default App;
