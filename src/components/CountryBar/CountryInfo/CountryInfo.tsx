import React, {useContext} from 'react';
import './CountryInfo.css'
import CloseIcon from "@mui/icons-material/Close";
import ReactCountryFlag from "react-country-flag"
import {SelectedCountryContext, VisitedCountriesContext} from "../../App/App";
import {Button, createTheme, ThemeProvider} from "@mui/material";

interface IProps {
  closeInfo: () => void
}

function CountryInfo({closeInfo}: IProps) {
  const { selectedCountry } = useContext(SelectedCountryContext)
  const { codes, addCountry, removeCountry} = useContext(VisitedCountriesContext)
  const isVisited = codes.includes(selectedCountry?.code ?? "-")

  const visitedButtonClick = () => {
    let code = selectedCountry?.code ?? ""
    if (code === "") return
    if (!isVisited) addCountry(code)
    else removeCountry(code)
  }

  // const visitedButtonClick
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
      <div className="CountryInfoButtons">
        <ThemeProvider theme={theme}>
          <Button
            variant="outlined"
            onClick={visitedButtonClick}
          >
            {isVisited ? 'Unmark country' : 'Mark as visited'}
          </Button>
        </ThemeProvider>
      </div>
    </div>
  )
}

const theme = createTheme({
  components: {
    MuiButtonBase: {
      styleOverrides: {
        root: {
          width: "100%",
          borderRadius: "13px !important",
          borderColor: "black !important",
          color: "black !important",
          fontWeight: "bold !important"
        }
      }
    },
  },
});

export default CountryInfo