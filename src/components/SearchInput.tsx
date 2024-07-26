import { SearchRounded } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";

export function SearchInput() {
  return (
    <TextField
      hiddenLabel
      id="search-input"
      variant="outlined"
      size="small"
      sx={{
        width: "240px",
        "> div": {
          borderRadius: "8px",
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
