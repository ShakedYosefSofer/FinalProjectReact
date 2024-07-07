import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react"; 
import './App.css';
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Header1 from "./components/Header1";
import Page404 from "./pages/Page404";
import { FavoriteProvider } from './context/FavoriteContext'; // שינוי כאן ל- FavoriteProvider
import Pixa from "./pages/Pixa";
import EmployeeDetails from './pages/EmployeeDetails';

function App() {
  return (
    <FavoriteProvider> {/* תיקון כאן לשימוש ב-FavoriteProvider */}
      <BrowserRouter>
        <Header1 />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Favorites" element={<Favorites />} />
          <Route path="/EmployeeDetails" element={<EmployeeDetails />} />
          <Route path="/pixa" element={<Pixa />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    </FavoriteProvider>
  );
}

export default App;
