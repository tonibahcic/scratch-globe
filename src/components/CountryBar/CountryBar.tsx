import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import Search from "./Search/Search";
import Results from "./Results/Results";
import './CountryBar.css'
import {Country, findCountries} from "../../data/Countries/conutries";

interface IProps {
  setFocusedCountry: Dispatch<SetStateAction<Country | undefined>>;
}

function CountryBar({ setFocusedCountry }: IProps) {
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
      <Search setInput={setInput} />
      <Results
        results={results}
        setFocusedCountry={setFocusedCountry}
      />
    </div>
  )
}

export default CountryBar;