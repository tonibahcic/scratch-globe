import React from 'react';
import './CountryInfo.css'
import CloseIcon from "@mui/icons-material/Close";
import {Country} from "../../../data/Countries/conutries";

interface IProps {
  closeInfo: () => void
  focusedCountry?: Country
}

function CountryInfo({closeInfo, focusedCountry}: IProps) {
  return (
    <div className="CountryInfo">
      <div className="CountryInfoHeader">
        <div className="CountryInfoHeaderName">
          {focusedCountry?.name}
        </div>
        <CloseIcon className="CountryInfoHeaderButton" onClick={closeInfo} />
      </div>
    </div>
  )
}

export default CountryInfo