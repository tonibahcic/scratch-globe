import React, {Dispatch, SetStateAction} from 'react';
import './Search.css';
import {createTheme, TextField, ThemeProvider} from "@mui/material";

interface IProps {
  setInput: Dispatch<SetStateAction<string>>;
}

function Search({ setInput }: IProps) {
  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let lowerCaseInput = e.target.value.toLowerCase();
    setInput(lowerCaseInput);
  };

  return (
    <div className="Search">
      <ThemeProvider theme={theme}>
        <TextField
          className="TextField"
          variant="filled"
          fullWidth
          placeholder="Country"
          onChange={inputHandler}
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