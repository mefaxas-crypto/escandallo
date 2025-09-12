import React from 'react';
import { NavLink } from 'react-router-dom'; // Import NavLink
import './Navbar.css';

function Navbar() {
  return (
    <nav className="main-nav">
      <NavLink to="/" className="nav-button">Plantilla de Receta</NavLink>
      <NavLink to="/ingredients" className="nav-button">Ingredientes</NavLink>
      <NavLink to="/recipes" className="nav-button">Recetas</NavLink>
      {/* The rest of these are placeholders for now */}
      <button className="nav-button disabled">Platos</button>
      <button className="nav-button disabled">Inventario</button>
      <button className="nav-button disabled">Historial de Cortes</button>
    </nav>
  );
}

export default Navbar;