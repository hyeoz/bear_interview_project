import { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material";

import { LocationFilter } from "./components/LocationFilter";
import { SearchInput } from "./components/SearchInput";
import "./App.css";
import { RobotTable } from "./components/RobotTable";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3961F8",
      dark: "#133BD3",
      light: "#B8DDFF",
    },
  },
});

function App() {
  const [filterValue, setFilterValue] = useState("ALL");

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <h5 className="fleet">Your Fleet</h5>
        <div className="filter-wrapper">
          <LocationFilter value={filterValue} setValue={setFilterValue} />
          <SearchInput />
        </div>
        <RobotTable />
      </div>
    </ThemeProvider>
  );
}

export default App;
