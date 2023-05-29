import React, {createContext, useContext, useState} from 'react';
import './App.css';
import GlobeWrapper from "../GlobeWrapper/GlobeWrapper";
import CountryBar from "../CountryBar/CountryBar";
import Navigation from "../Navigation/Navigation";
import {Country} from "../../data/Countries/conutries";

interface ICountryContext {
  selectedCountry?: Country,
  setSelectedCountry: (country?: Country) => void
}

export const SelectedCountryContext = createContext<ICountryContext>({
  selectedCountry: undefined,
  setSelectedCountry: () => {}
});

function App() {
  const [selectedCountry, setSelectedCountry] = useState<Country | undefined>()
  const value = { selectedCountry, setSelectedCountry }

  return (
    <div className="App">
      <header className="App-header">
        <SelectedCountryContext.Provider value={value}>
          <Navigation/>
          <GlobeWrapper />
          <CountryBar />
        </SelectedCountryContext.Provider>
      </header>
    </div>
  );
}

export default App;
