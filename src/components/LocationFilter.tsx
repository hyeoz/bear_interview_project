import {
  ArrowDropDownRounded,
  ArrowDropUpRounded,
  DoneRounded,
  SearchRounded,
  StarRateRounded,
} from "@mui/icons-material";
import { InputAdornment, MenuItem, Select, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

import { getAllLocationsData } from "../api";
import { Location } from "../mocks/db";

export function LocationFilter({
  value,
  setValue,
}: {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [open, setOpen] = useState(false);
  const [allData, setAllData] = useState<Location[]>([]);

  useEffect(() => {
    getAllLocations();
  }, []);

  const getAllLocations = async () => {
    const res = await getAllLocationsData();
    setAllData(res.data.locations);
  };

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
      <MenuItem
        value="ALL"
        style={{
          justifyContent: "space-between",
        }}
      >
        <p className="body_2">All Locations</p>
        {value === "ALL" && (
          <DoneRounded
            style={{
              width: "16px",
              height: "16px",
              color: "var(--primary-main-color)",
            }}
          />
        )}
      </MenuItem>
      <MenuItem
        value="isStarred"
        style={{
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex" }}>
          <StarRateRounded
            style={{
              color: "var(--system-notice-color)",
            }}
          />
          <p className="body_2" style={{ marginTop: "2px" }}>
            Stared (
            {
              JSON.parse(sessionStorage.getItem("starred_location_ids") || "[]")
                .length
            }
            )
          </p>
        </div>
        {value === "isStarred" && (
          <DoneRounded
            style={{
              width: "16px",
              height: "16px",
              color: "var(--primary-main-color)",
            }}
          />
        )}
      </MenuItem>
      <MenuItem
        value="group_1"
        style={{
          justifyContent: "space-between",
        }}
      >
        <p className="body_2">Group 1 (10)</p>
        {value === "group_1" && (
          <DoneRounded
            style={{
              width: "16px",
              height: "16px",
              color: "var(--primary-main-color)",
            }}
          />
        )}
      </MenuItem>
      <MenuItem
        value="group_2"
        style={{
          justifyContent: "space-between",
        }}
      >
        <p className="body_2">Group 2 (2)</p>
        {value === "group_2" && (
          <DoneRounded
            style={{
              width: "16px",
              height: "16px",
              color: "var(--primary-main-color)",
            }}
          />
        )}
      </MenuItem>
      <MenuItem
        value="group_3"
        style={{
          justifyContent: "space-between",
        }}
      >
        <p className="body_2">Group 3 (4)</p>
        {value === "group_3" && (
          <DoneRounded
            style={{
              width: "16px",
              height: "16px",
              color: "var(--primary-main-color)",
            }}
          />
        )}
      </MenuItem>
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
