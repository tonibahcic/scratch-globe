import React from 'react';
import './NavigationBar.css'

function NavigationBar() {
  return (
    <div className="NavigationBar">
      <div className="Item">
        Globe
      </div>
      <div className="Item">
        Travel agent
      </div>
      <div className="Item">
        Future trips
      </div>
      <div className="Item">
        Profile
      </div>
    </div>
  )
}

export default NavigationBar;