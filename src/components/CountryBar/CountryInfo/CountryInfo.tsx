import React from 'react';
import './CountryInfo.css'
import CloseIcon from "@mui/icons-material/Close";
import {Country} from "../../../data/Countries/conutries";
import ReactCountryFlag from "react-country-flag"

interface IProps {
  closeInfo: () => void
  focusedCountry?: Country
}

function CountryInfo({closeInfo, focusedCountry}: IProps) {
  return (
    <div className="CountryInfo">
      <div className="CountryInfoHeader">
        <div className="CountryInfoHeaderName">
          <ReactCountryFlag
            countryCode={focusedCountry?.flagCode ?? ""}
            svg
          />
          {focusedCountry?.name}
        </div>
        <CloseIcon className="CountryInfoHeaderButton" onClick={closeInfo}/>
      </div>
      <div className="CountryInfoDetails">
        <div>
          <span>Formal Name:{' '}</span>
          {focusedCountry?.details.formalName}
        </div>
        <div>
          <span>Type:{' '}</span>
          {focusedCountry?.details.type}
        </div>
        <div>
          <span>Continent:{' '}</span>
          {focusedCountry?.details.continent}
        </div>
        <div>
          <span>Subregion:{' '}</span>
          {focusedCountry?.details.subregion}
        </div>
        <div>
          <span>Population:{' '}</span>
          {
            ((focusedCountry?.details.populationNumber ?? 0) / 1_000_000).toFixed(2)
          }
          {'M '}
          ({focusedCountry?.details.populationYear}.)
        </div>
        <div>
          <span>GDP:{' '}</span>
          {'$'}
          {focusedCountry?.details.gdpNumber}
          {' '}
          ({focusedCountry?.details.gdpYear}.)
        </div>
      </div>
    </div>
  )
}

export default CountryInfo