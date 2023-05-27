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
          variant="outlined"
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
          color: 'white',
          fontWeight: 'bold',
          padding: '5px 20px'
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          border: 0,
        }
      }
    }
  },
});

export default Search;