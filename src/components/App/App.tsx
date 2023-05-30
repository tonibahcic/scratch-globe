import React, {createContext, useState} from 'react';
import './App.css';
import GlobeWrapper from "../GlobeWrapper/GlobeWrapper";
import CountryBar from "../CountryBar/CountryBar";
import {Country} from "../../data/Countries/conutries";
import NavigationBar from "../NavigationBar/NavigationBar";

interface ICountryContext {
  selectedCountry?: Country,
  setSelectedCountry: (country?: Country) => void
}

export const SelectedCountryContext = createContext<ICountryContext>({
  selectedCountry: undefined,
  setSelectedCountry: () => {}
});

interface IVisitedCountries {
  codes: string[],
  addCountry: (code: string) => void
  removeCountry: (code: string) => void
}

export const VisitedCountriesContext = createContext<IVisitedCountries>({
  codes: [],
  addCountry: (code: string) => {},
  removeCountry: (code: string) => {}
});


function App() {
  const [selectedCountry, setSelectedCountry] = useState<Country | undefined>()
  const countryContextValue = { selectedCountry, setSelectedCountry }

  const [visitedCountries, setVisitedCountries] = useState<string[]>(['HRV', 'DEU', 'ITA'])
  const addCountry = (code: string) => setVisitedCountries([code, ...visitedCountries])
  const removeCountry = (code: string) => setVisitedCountries([...visitedCountries.filter(c => c !== code)])
  const visitedCountriesContextValue = { codes: visitedCountries, addCountry, removeCountry }

  return (
    <div className="App">
      <header className="App-header">
        <VisitedCountriesContext.Provider value={visitedCountriesContextValue}>
        <SelectedCountryContext.Provider value={countryContextValue}>
          <NavigationBar />
          <GlobeWrapper />
          <CountryBar />
        </SelectedCountryContext.Provider>
        </VisitedCountriesContext.Provider>
      </header>
    </div>
  );
}

export default App;
