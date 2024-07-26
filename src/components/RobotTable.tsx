import {
  ArrowBackIosNewRounded,
  ArrowForwardIosRounded,
  RefreshRounded,
} from "@mui/icons-material";
import { Pagination, PaginationItem } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

export function RobotTable() {
  const columns: GridColDef<any>[] = [
    {
      field: "star",
      renderHeader: (params) => (
        <RefreshRounded
          style={{
            width: "24px",
            height: "24px",
          }}
        />
      ),
      width: 24,
      sortable: false,
    },
    {
      field: "locations",
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
      width: 432,
      sortable: false,
    },
    {
      field: "robots",
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
      flex: 1,
      sortable: false,
    },
  ];

  return (
    <>
      <DataGrid
        rows={[]}
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
      <Pagination
        count={10}
        page={1}
        color="primary"
        size="small"
        sx={{
          marginTop: "24px",
          "& ul": {
            justifyContent: "center",
            gap: "16px",
          },
        }}
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
    </>
  );
}
