import React from 'react';
import './Results.css'

interface IProps {
  results: string[]
}

function Results({results}: IProps) {
  return (
    <div className="Results">
      {results.map(country => {
        return (
          <div id={country} className="SingleResult">
            {country}
          </div>
        )
      })}
    </div>
  )
}

export default Results;