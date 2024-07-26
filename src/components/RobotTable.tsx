import { useEffect, useState } from "react";
import {
  ArrowForwardIosRounded,
  RefreshRounded,
  StarOutlineRounded,
  StarRounded,
} from "@mui/icons-material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import { Location } from "../mocks/db";
import { getLocationIdsData, putLocationIdData } from "../api";

export function RobotTable({ data }: { data: Location[] }) {
  const [locationIds, setLocationIds] = useState<string[]>([]);

  useEffect(() => {
    getLocationIds();
  }, []);

  const getLocationIds = async () => {
    const res = await getLocationIdsData();
    setLocationIds(res.data.location_ids);
  };

  const onClickEmptyStar = async (id: number) => {
    try {
      await putLocationIdData(id);
      await getLocationIds();
    } catch (error) {
      alert("Could not star an item due to unexpected error!");
    }
  };

  const getIsStarred = (id: string) => {
    console.log(
      id,
      Array.isArray(locationIds) ? locationIds.includes(id) : false
    );
    return Array.isArray(locationIds) ? locationIds.includes(id) : false;
  };

  const columns: GridColDef<Location>[] = [
    {
      field: "starred",
      renderHeader: (params) => (
        <RefreshRounded
          style={{
            width: "24px",
            height: "24px",
          }}
        />
      ),
      renderCell: (data) =>
        getIsStarred(data.row.id + "") ? (
          <StarRounded
            style={{
              marginTop: "12px",
              color: "var(--system-notice-color)",
            }}
          />
        ) : (
          <div
            style={{
              cursor: "pointer",
            }}
            onClick={() => onClickEmptyStar(data.row.id)}
          >
            <StarOutlineRounded
              style={{
                marginTop: "12px",
              }}
            />
          </div>
        ),
      width: 24,
      sortable: false,
    },
    {
      field: "name",
      // headerName: "Locations",
      renderHeader: (params) => (
        <div
          style={{
            display: "flex",
            gap: "16px",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "1px",
              height: "16px",
              backgroundColor: "#D9D9D9",
            }}
          />
          <p
            className="body_2"
            style={{
              color: "#D9D9D9",
            }}
          >
            Locations
          </p>
        </div>
      ),
      renderCell: (data) => (
        <div
          style={{
            borderRadius: "8px",
            backgroundColor: data.row.robot.is_online
              ? "var(--secondary-main-color)"
              : "#e4e4e4",
            display: "flex",
            // justifyContent: "center",
            alignItems: "center",
            height: "36px",
            marginTop: "6px",
            paddingRight: "16px",
          }}
        >
          <p
            className="subtitle_1"
            style={{
              color: "#fff",
              flex: 1,
              textAlign: "center",
            }}
          >
            {data.row.name}
          </p>
          <ArrowForwardIosRounded
            style={{
              color: "#fff",
              width: "16px",
              height: "16px",
            }}
          />
        </div>
      ),
      width: 432,
      sortable: false,
    },
    {
      field: "robot.id",
      renderHeader: (params) => (
        <div
          style={{
            display: "flex",
            gap: "16px",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "1px",
              height: "16px",
              backgroundColor: "#D9D9D9",
            }}
          />
          <p className="body_2">Robots</p>
        </div>
      ),
      renderCell: (data) =>
        !!data.row.robot.id ? (
          data.row.robot.is_online ? (
            <div
              style={{
                display: "flex",
                gap: "16px",
                marginTop: "12px",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "16px",
                  height: "16px",
                  borderRadius: 999,
                  backgroundColor: "var(--system-success-color)",
                }}
              />
              <p className="subtitle_1">{data.row.robot.id}</p>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                gap: "16px",
                marginTop: "12px",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "16px",
                  height: "16px",
                  borderRadius: 999,
                  backgroundColor: "var(--system-notice-color)",
                }}
              />
              <p className="subtitle_2">{data.row.robot.id}</p>
            </div>
          )
        ) : (
          <a>Add</a>
        ),
      width: 240,
      sortable: false,
    },
    {
      field: "locationTypes",
      renderHeader: (params) => (
        <div
          style={{
            display: "flex",
            gap: "16px",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "1px",
              height: "16px",
              backgroundColor: "#D9D9D9",
            }}
          />
          <p className="body_2">Location Types</p>
        </div>
      ),
      renderCell: (data) => (
        <div
          style={{
            marginTop: "12px",
          }}
        >
          {data.row.robot.is_online ? (
            <p className="body_2">Serving</p>
          ) : (
            <p className="body_2">Disinfection</p>
          )}
        </div>
      ),
      flex: 1,
      sortable: false,
    },
  ];

  return (
    <DataGrid
      rows={data}
      columns={columns}
      checkboxSelection
      disableRowSelectionOnClick
      disableColumnMenu
      disableColumnResize
      pageSizeOptions={[6]}
      hideFooter
      sx={{
        "& .MuiDataGrid-columnSeparator": {
          display: "none",
        },
      }}
    />
  );
}
