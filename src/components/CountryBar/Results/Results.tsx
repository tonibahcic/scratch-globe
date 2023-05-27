import React, {Dispatch, SetStateAction} from 'react';
import './Results.css'
import {Country} from "../../../data/Countries/conutries";

interface IProps {
  results: Country[]
  setFocusedCountry: Dispatch<SetStateAction<Country | undefined>>;
}

function Results({results, setFocusedCountry}: IProps) {
  return (
    <div className="Results">
      {results.map(country => {
        return (
          <div
            id={country.name}
            className="SingleResult"
            onClick={(() => setFocusedCountry(country))}
          >
            {country.name}
          </div>
        )
      })}
    </div>
  )
}

export default Results;