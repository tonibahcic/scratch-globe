import React, {useContext} from 'react';
import './CountryInfo.css'
import CloseIcon from "@mui/icons-material/Close";
import ReactCountryFlag from "react-country-flag"
import {SelectedCountryContext} from "../../App/App";

interface IProps {
  closeInfo: () => void
}

function CountryInfo({closeInfo}: IProps) {
  const { selectedCountry } = useContext(SelectedCountryContext)
  return (
    <div className="CountryInfo">
      <div className="CountryInfoHeader">
        <div className="CountryInfoHeaderName">
          <ReactCountryFlag
            countryCode={selectedCountry?.flagCode ?? ""}
            svg
          />
          {selectedCountry?.name}
        </div>
        <CloseIcon className="CountryInfoHeaderButton" onClick={closeInfo}/>
      </div>
      <div className="CountryInfoDetails">
        <div>
          <span>Formal Name:{' '}</span>
          {selectedCountry?.details.formalName}
        </div>
        <div>
          <span>Type:{' '}</span>
          {selectedCountry?.details.type}
        </div>
        <div>
          <span>Continent:{' '}</span>
          {selectedCountry?.details.continent}
        </div>
        <div>
          <span>Subregion:{' '}</span>
          {selectedCountry?.details.subregion}
        </div>
        <div>
          <span>Population:{' '}</span>
          {((selectedCountry?.details.populationNumber ?? 0) / 1_000_000).toFixed(2)}
          {'M '}
          ({selectedCountry?.details.populationYear}.)
        </div>
        <div>
          <span>GDP:{' '}</span>
          {'$'}
          {selectedCountry?.details.gdpNumber}
          {' '}
          ({selectedCountry?.details.gdpYear}.)
        </div>
      </div>
    </div>
  )
}

export default CountryInfo