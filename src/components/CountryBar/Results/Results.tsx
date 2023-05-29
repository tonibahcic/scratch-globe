import React, {useContext} from 'react';
import './Results.css'
import {Country} from "../../../data/Countries/conutries";
import {SelectedCountryContext} from "../../App/App";

interface IProps {
  results: Country[]
}

function Results({results}: IProps) {
  const { setSelectedCountry } = useContext(SelectedCountryContext)
  return (
    <div className="Results">
      {results.map(country => {
        return (
          <div
            id={country.name}
            className="SingleResult"
            onClick={(() => setSelectedCountry(country))}
          >
            {country.name}
          </div>
        )
      })}
    </div>
  )
}

export default Results;