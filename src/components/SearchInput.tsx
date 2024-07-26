import { useState } from "react";
import { SearchRounded } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";
import { getLocationsData, LocationsDataType } from "../api";

export function SearchInput({
  page,
  setData,
}: {
  page: number;
  setData: React.Dispatch<React.SetStateAction<LocationsDataType>>;
}) {
  const [value, setValue] = useState("");

  const onEnterSearch = async () => {
    const res = await getLocationsData({
      page,
      location_name: value,
      robot_id: value,
    });
    setData(res.data);
  };

  return (
    <TextField
      hiddenLabel
      id="search-input"
      variant="outlined"
      size="small"
      value={value}
      onChange={(event) => setValue(event.target.value)}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          onEnterSearch();
        }
      }}
      sx={{
        width: "240px",
        "> div": {
          borderRadius: "8px",
        },
        "&:hover": {
          borderColor: "var(--primary-main-color)",
        },
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <SearchRounded
              style={{
                width: "24px",
                height: "24px",
              }}
              htmlColor="#000"
            />
          </InputAdornment>
        ),
      }}
      placeholder="Search robot or location"
    />
  );
}
