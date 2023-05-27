import React from 'react';
import './Results.css'
import {Country} from "../../../data/Countries/conutries";

interface IProps {
  results: Country[]
}

function Results({results}: IProps) {
  return (
    <div className="Results">
      {results.map(country => {
        return (
          <div id={country.name} className="SingleResult">
            {country.name}
          </div>
        )
      })}
    </div>
  )
}

export default Results;