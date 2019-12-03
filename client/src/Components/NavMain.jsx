import React from "react";
import { NavLink } from "react-router-dom";
const NavMain = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink exact to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/artists">Artists</NavLink>
        </li>
        <li>
          <NavLink to="/albums">Albums</NavLink>
        </li>
        <li>
          <NavLink to="/create-album">Create Album</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavMain;
