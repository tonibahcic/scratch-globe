import React from 'react';
import './NavigationBar.css'
import {Link, Outlet} from "react-router-dom";

function NavigationBar() {
  return (
    <>
      <div className="NavigationBar">
        <Link to="/scratch-globe" className="Item">Globe</Link>
        <Link to="/scratch-globe/travel-agent" className="Item">Travel agent</Link>
        <Link to="/scratch-globe/future-trips" className="Item">Future trips</Link>
        <Link to="/scratch-globe/profile" className="Item">Profile</Link>
      </div>
      <Outlet />
    </>
)
}

export default NavigationBar;