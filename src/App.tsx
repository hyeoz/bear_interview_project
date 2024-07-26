import { useCallback, useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import { Pagination, PaginationItem } from "@mui/material";
import {
  ArrowBackIosNewRounded,
  ArrowForwardIosRounded,
} from "@mui/icons-material";

import { LocationFilter } from "./components/LocationFilter";
import { SearchInput } from "./components/SearchInput";
import { RobotTable } from "./components/RobotTable";
import { getLocationIdsData, getLocationsData } from "./api";
import { Location } from "./mocks/db";
import "./App.css";

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
  const [locationName, setLocationName] = useState("ALL");
  const [page, setPage] = useState(1);
  const [data, setData] = useState<{
    total_count: number;
    locations: Location[];
  }>({ total_count: 0, locations: [] });

  useEffect(() => {
    getLocation();
  }, [page]);

  useEffect(() => {
    getStarred();
  }, [locationName]);

  const getLocation = useCallback(async () => {
    const res = await getLocationsData({
      page,
    });
    setData(res.data);
  }, [page]);

  const getStarred = useCallback(async () => {
    if (locationName !== "isStarred") return;
    const res = await getLocationIdsData();
    setData((prev) => ({
      total_count: data.locations.filter((loc) =>
        res.data.location_ids.includes(loc.id + "")
      ).length,
      locations: prev.locations.filter((loc) =>
        res.data.location_ids.includes(loc.id + "")
      ),
    }));
  }, [locationName]);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <h5 className="fleet">Your Fleet</h5>
        <div className="filter-wrapper">
          <LocationFilter value={locationName} setValue={setLocationName} />
          <SearchInput page={page} setData={setData} />
        </div>
        <RobotTable data={data.locations} />

        <Pagination
          count={Math.ceil(data.total_count / 6)}
          page={page}
          color="primary"
          size="small"
          sx={{
            marginTop: "24px",
            "& ul": {
              justifyContent: "center",
              gap: "16px",
            },
          }}
          onChange={(event, page) => setPage(page)}
          renderItem={(item) => (
            <PaginationItem
              slots={{
                previous: ArrowBackIosNewRounded,
                next: ArrowForwardIosRounded,
              }}
              {...item}
            />
          )}
        />
      </div>
    </ThemeProvider>
  );
}

export default App;
