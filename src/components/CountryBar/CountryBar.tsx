import React, {useContext, useEffect, useState} from 'react';
import Search from "./Search/Search";
import Results from "./Results/Results";
import './CountryBar.css'
import {Country, findCountries} from "../../data/Countries/conutries";
import CountryInfo from "./CountryInfo/CountryInfo";
import {SelectedCountryContext} from "../App/App";

function CountryBar() {
  const [input, setInput] = useState<string>("")
  const [results, setResults] = useState<Country[]>([])
  const {selectedCountry, setSelectedCountry} = useContext(SelectedCountryContext)

  useEffect(() => {
    if (input.trim() === "") {
      setResults([])
      return
    }

    let countries = findCountries(input)
    setResults(countries)
  }, [input])

  return (
    <div className="CountryBar">
      {
        selectedCountry !== undefined ? (
          <>
            <CountryInfo
              closeInfo={() => {
                setSelectedCountry(undefined)
                setInput("")
              }}
            />
          </>
        ) : (
          <>
            <Search setInput={setInput} />
            <Results results={results} />
          </>
        )
      }
    </div>
  )
}

export default CountryBar;