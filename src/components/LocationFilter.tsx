import {
  ArrowDropDownRounded,
  ArrowDropUpRounded,
  SearchRounded,
} from "@mui/icons-material";
import {
  Input,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";

export function LocationFilter({
  value,
  setValue,
}: {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Select
      id="location-filter"
      size="small"
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      IconComponent={open ? CustomArrowUpIcon : CustomArrowDownIcon}
      style={{
        width: "220px",
        borderRadius: "8px",
      }}
      sx={{
        "& .MuiPaper-root": {
          top: "4px",
        },
      }}
      placeholder="All Locations"
      defaultValue={"ALL"}
      value={value}
      onChange={(event) => setValue(event.target.value)}
    >
      <TextField
        id="filter-input"
        size="small"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchRounded
                style={{
                  width: "24px",
                  height: "24px",
                  color: "var(--grey-500-color)",
                }}
              />
            </InputAdornment>
          ),
        }}
        placeholder="Search Group"
      />
      {/* <MenuItem value="ALL">
        <p className="body_2">All Locations</p>
      </MenuItem> */}
    </Select>
  );
}

function CustomArrowDownIcon() {
  return (
    <ArrowDropDownRounded
      style={{
        width: "32px",
        height: "32px",
        marginRight: "12px",
        color: "var(--black-scale-color)",
      }}
    />
  );
}
function CustomArrowUpIcon() {
  return (
    <ArrowDropUpRounded
      style={{
        width: "32px",
        height: "32px",
        marginRight: "12px",
        color: "var(--black-scale-color)",
      }}
    />
  );
}
