import React, {Dispatch, SetStateAction, useContext} from 'react';
import './Search.css';
import {createTheme, TextField, ThemeProvider} from "@mui/material";
import {SelectedCountryContext} from "../../App/App";
import {Country} from "../../../data/Countries/conutries";

interface IProps {
  setInput: Dispatch<SetStateAction<string>>;
  results: Country[]
}

function Search({ setInput, results }: IProps) {
  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let lowerCaseInput = e.target.value.toLowerCase();
    setInput(lowerCaseInput);
  };
  const { setSelectedCountry } = useContext(SelectedCountryContext)

  const onKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      setSelectedCountry(results[0])
    }
  }

  return (
    <div className="Search">
      <ThemeProvider theme={theme}>
        <TextField
          className="TextField"
          variant="filled"
          fullWidth
          placeholder="Country"
          onChange={inputHandler}
          onKeyDown={onKeyPress}
        />
      </ThemeProvider>
    </div>
  )
}

const theme = createTheme({
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontSize: '25px',
          fontWeight: 'bold',
          paddingBottom: '10px',
          paddingLeft: '10px',
        },
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
          ":after": {
            border: 'none',
          }
        }
      }
    }
  },
});

export default Search;