import { Box, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Data } from "./models";
import SingleTransactionDialog from "../dialog/SingleTransactionDialog";
import { gridColumns } from "./Columns";
const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL; // fetching from .env file

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

  // method to fetch data from server api
  const fetchData = async (page: number = 1) => {
    const response = await fetch(
      `${VITE_BACKEND_URL}/transactions?page=${page}`
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

  // add ids to row data
  // necessary for datagrid
  const makeRows = (data) => {
    return data.map((item: Data) => ({
      ...item,
      id: item.ID,
    }));
  };

  // // Fetch the data for the initial page.
  useEffect(() => {
    fetchData(paginationModel.page + 1);
  }, [paginationModel.page]);

  // columns for data grid
  const columns = gridColumns

  // open and close dialog for a single transaction details
  const [dialogToggle, setDialogToggle] = useState<boolean>(false);

  const [currentRow, setCurrentRow] = useState(null);

  return (
    <Box>
      <Typography
        variant="body1"
        p={1}
        sx={{ backgroundColor: "yellow", marginBottom: 2 }}
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
        rows={pageState.rows || []}
        columns={columns}
        rowCount={rowCountState}
        loading={pageState.isLoading}
        pageSizeOptions={[25]}
        paginationModel={paginationModel}
        paginationMode="server"
        onPaginationModelChange={setPaginationModel}
        disableRowSelectionOnClick
        onRowDoubleClick={(row) => {
          // set the current row
          setCurrentRow(row);
          setDialogToggle(true);
        }}
      />

      <SingleTransactionDialog
        dialogToggle={dialogToggle}
        closeToggleFunc={() => {
          setDialogToggle(false);
        }}
        rowData={currentRow}
      />
    </Box>
  );
}
