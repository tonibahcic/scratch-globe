import React, {useState} from 'react';
import './App.css';
import GlobeWrapper from "../GlobeWrapper/GlobeWrapper";
import CountryBar from "../CountryBar/CountryBar";
import Navigation from "../Navigation/Navigation";
import {Country} from "../../data/Countries/conutries";

function App() {
  const [focusedCountry, setFocusedCountry] = useState<Country | undefined>()
  return (
    <div className="App">
      <header className="App-header">
        <Navigation />
        <GlobeWrapper focusedCountry={focusedCountry} />
        <CountryBar
          focusedCountry={focusedCountry}
          setFocusedCountry={setFocusedCountry}
        />
      </header>
    </div>
  );
}

export default App;
