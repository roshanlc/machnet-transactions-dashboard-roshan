import { Box, Typography } from "@mui/material";
import { green, red } from "@mui/material/colors";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { useEffect, useState } from "react";

export default function TransactionPage() {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 25,
  });

  // other info related to pagination
  const [pageState, setPageState] = useState({
    isLoading: false,
    rows: [],
    pageInfo: { totalRowCount: 0 },
  });

  // keep track of row count
  const [rowCountState, setRowCountState] = useState<number>(
    pageState?.pageInfo?.totalRowCount || 0
  );

  // update rowCountState on pageInfo change
  useEffect(() => {
    setRowCountState((prevRowCountState) =>
      pageState?.pageInfo?.totalRowCount !== undefined
        ? pageState?.pageInfo?.totalRowCount
        : prevRowCountState
    );
  }, [pageState?.pageInfo?.totalRowCount, setRowCountState]);

  const fetchData = async (page: number = 1) => {
    const response = await fetch(
      `http://localhost:9000/api/v1/transactions?page=${page}`
    );

    const data = await response.json();
    setPageState((prev) => ({
      ...prev,
      rows: makeRows(data.data),
      isLoading: false,
      pageInfo: {
        totalRowCount: data.pages.total_items || 0,
      },
    }));
  };

  const makeRows = (data) => {
    return data.map((item) => ({
      ...item,
      id: item.ID,
    }));
  };
  // Fetch the data for the initial page.
  useEffect(() => {
    fetchData(paginationModel.page + 1);
  }, [paginationModel.page]);

  // columns for data grid
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "Date",
      headerName: "Date",
      width: 100,
      renderCell: (params) => (
        <Typography>
          {/* {params.row.Date.split("T")[0] || "-"} // basic date format */}
          {new Date(params.row.Date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}
        </Typography>
      ),
    },

    {
      field: "FromAccount",
      headerName: "From",
      width: 190,
      renderCell: (params) => (
        <Typography>{params.row.FromAccount.Customer.name || "-"}</Typography>
      ),
    },
    {
      field: "ToAccount",
      headerName: "To",
      width: 190,
      renderCell: (params) => (
        <Typography>{params.row.ToAccount.Customer.name || "-"}</Typography>
      ),
    },
    {
      field: "Amount",
      headerName: "Amount",
      width: 150,
      renderCell: (params) => (
        <>
          <Typography color={params.row.Amount > 0 ? "green" : "error"}>
            $ {params.row.Amount}
          </Typography>
        </>
      ),
    },
    {
      field: "Account",
      headerName: "Account",
      width: 150,
      renderCell: (params) => (
        <>
          <Typography>
            {params.row.ToAccount.AccountType.type || "-"}
          </Typography>
        </>
      ),
    },
    {
      field: "PaymentMethod",
      headerName: "Payment Method",
      width: 180,
      renderCell: (params) => (
        <>
          <Typography>{params.row.PaymentMethod.method || "-"}</Typography>
        </>
      ),
    },
    {
      field: "TransactionStatus",
      headerName: "Status",
      width: 130,
      renderCell: (params) => (
        <>
          <Typography
            color={
              params.row.TransactionStatus.status == "Completed"
                ? "teal"
                : "blueviolet"
            }
          >
            {params.row.TransactionStatus.status || "-"}
          </Typography>
        </>
      ),
    },
  ];

  const rows = [{ id: 1, from: "random", to: "me" }];
  return (
    <Box>
      <Typography
        variant="body1"
        pb={1}
        sx={{ backgroundColor: "yellow", marginBottom: 1 }}
      >
        <i>Note:</i> Pagination Controls are at bottom of the data table. Please
        double click on a row to view the details popup.
      </Typography>

      <DataGrid
        sx={{ borderRadius: 2 }}
        components={{
          Toolbar: GridToolbar,
        }}
        autoHeight
        rows={pageState.rows || rows}
        columns={columns}
        rowCount={rowCountState}
        loading={pageState.isLoading}
        pageSizeOptions={[25]}
        paginationModel={paginationModel}
        paginationMode="server"
        onPaginationModelChange={setPaginationModel}
        disableRowSelectionOnClick
        onRowDoubleClick={(row) => {
          // put the double click logic to open the details of a transaction
          console.log(row);
        }}
      />
      {/* <DataGrid
        sx={{ borderRadius: 2 }}
        components={{
          Toolbar: GridToolbar,
        }}
        disableRowSelectionOnClick
        onRowDoubleClick={(row) => {
          // put the double click logic to open the details of a transaction
          console.log(row);
        }}
        columns={columns}
        autoHeight
        pagination
        paginationMode="server"
        rows={row} //{pageState.data}
        loading={pageState.isLoading || false}
        pageSizeOptions={[25]}
        paginationModel={{ ...pageState, page: pageState.page - 1 }} // the page size start from 0 for mui data grid
      /> */}
    </Box>
  );
}
