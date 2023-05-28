import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import Search from "./Search/Search";
import Results from "./Results/Results";
import './CountryBar.css'
import {Country, findCountries} from "../../data/Countries/conutries";
import CountryInfo from "./CountryInfo/CountryInfo";

interface IProps {
  focusedCountry?: Country
  setFocusedCountry: Dispatch<SetStateAction<Country | undefined>>;
}

function CountryBar({ focusedCountry, setFocusedCountry }: IProps) {
  const [input, setInput] = useState<string>("")
  const [results, setResults] = useState<Country[]>([])

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
        focusedCountry !== undefined ? (
          <>
            <CountryInfo
              closeInfo={() => {
                setFocusedCountry(undefined)
                setInput("")
              }}
              focusedCountry={focusedCountry}
            />
          </>
        ) : (
          <>
            <Search setInput={setInput} />
            <Results
              results={results}
              setFocusedCountry={setFocusedCountry}
            />
          </>
        )
      }
    </div>
  )
}

export default CountryBar;