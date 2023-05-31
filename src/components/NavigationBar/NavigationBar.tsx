import React from 'react';
import './NavigationBar.css'
import {Link, Outlet} from "react-router-dom";

function NavigationBar() {
  return (
    <>
      <div className="NavigationBar">
        <Link to="/" className="Item">Globe</Link>
        <Link to="/travel-agent" className="Item">Travel agent</Link>
        <Link to="/future-trips" className="Item">Future trips</Link>
        <Link to="/profile" className="Item">Profile</Link>
      </div>
      <Outlet />
    </>
)
}

export default NavigationBar;