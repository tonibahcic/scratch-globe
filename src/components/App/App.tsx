import React from 'react';
import './App.css';
import GlobeWrapper from "../GlobeWrapper/GlobeWrapper";
import CountryBar from "../CountryBar/CountryBar";
import Navigation from "../Navigation/Navigation";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navigation />
        <GlobeWrapper />
        <CountryBar />
      </header>
    </div>
  );
}

export default App;
