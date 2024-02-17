import { Avatar, Box, Chip, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Data } from "./models";
import SingleTransactionDialog from "./dialog/SingleTransactionDialog";
import PendingIcon from '@mui/icons-material/Pending';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { East, RequestPage, SendSharp, West } from "@mui/icons-material";
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
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "Date",
      headerName: "Date",
      width: 100,
      renderCell: (params) => (
        <Typography>
          {/* {params.row.Date.split("T")[0] || "-"} // basic date format */}
          {new Date(params?.row?.Date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}
        </Typography>
      ),
    },

    {
      field: "FromAccount",
      headerName: "From",
      width: 252,
      renderCell: (params) => (
        <>
          <Avatar alt="From" color="primary"
            sx={{ width: 30, height: 30, bgcolor: getRandomColor() }}>
            {getInitials(params?.row?.FromAccount?.Customer?.name)}
          </Avatar>
          <Box pr={2} />
          <Typography>
            {params?.row?.FromAccount?.Customer?.name || "-"}
          </Typography>
        </>
      ),
    },
    {
      field: "ToAccount",
      headerName: "To",
      width: 252,
      renderCell: (params) => (
        <>
          <Avatar alt="From" color="primary"
            sx={{ width: 30, height: 30, bgcolor: getRandomColor() }}>
            {getInitials(params?.row?.ToAccount?.Customer?.name)}
          </Avatar>
          <Box pr={2} />
          <Typography>
            {params?.row?.ToAccount?.Customer?.name || "-"}
          </Typography>
        </>
      ),
    },
    {
      field: "Amount",
      headerName: "Amount",
      width: 150,
      renderCell: (params) => (
        <>
          <Typography fontSize={"1.2rem"} color={params?.row?.TransactionStatus?.status == "Pending" ? "#4a4e69" : params.row.Amount > 0 ? "green" : "error"}>
            $ {params?.row?.Amount.toString().split(".")[0] || "-"}
            <sup style={{fontSize: "0.83rem"}}>
              {params?.row?.Amount.toString().split(".")[1] && "."}
              {params?.row?.Amount.toString().split(".")[1] || ""}
            </sup>
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
          <Chip variant="outlined"
            size="medium"
            sx={{ minWidth: 85, borderRadius: 1.5 }}
            label={
              <Typography>
                {params?.row?.ToAccount?.AccountType?.type || "-"}
              </Typography>
            }>
          </Chip>
        </>
      ),
    },
    {
      field: "PaymentMethod",
      headerName: "Payment Method",
      width: 180,
      renderCell: (params) => (
        <>
          {params?.row?.PaymentMethod?.method == "Transfer" && (params.row.id % 2 == 0 ? <East /> : <West />)}
          {params?.row?.PaymentMethod?.method == "Wiring" && <SendSharp />}
          {params?.row?.PaymentMethod?.method == "Cheque Deposit" && <RequestPage />}
          <Typography pl={1}>{params?.row?.PaymentMethod?.method || "-"}</Typography>
        </>
      ),
    },
    {
      field: "TransactionStatus",
      headerName: "Status",
      width: 150,
      renderCell: (params) => (
        <Chip
          size="medium"
          variant="outlined"
          color={params?.row?.TransactionStatus?.status == "Completed" ? "success" : "primary"}
          icon={params?.row?.TransactionStatus?.status == "Pending" ? <PendingIcon /> : <DoneAllIcon />}
          label={
            <Typography

            >
              {params?.row?.TransactionStatus?.status || "-"}
            </Typography>
          }
        />

      ),
    },
  ];

  // open and close dialog for a single transaction details
  const [dialogToggle, setDialogToggle] = useState<boolean>(false);

  const [currentRow, setCurrentRow] = useState<any>(null);

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

/**
 * Generate random color
 * @returns random color
 */
function getRandomColor(): string {
  // NOTE: Personally selected from colorhunt.io
  const palettes = [
    "#294B29", "#50623A", "#789461", "#E19898", "#A2678A", "#4D3C77", "#860A35", "#AF2655",
    "#A3B763", "#219C90", "#E9B824", "#EE9322", "#D83F31", "#252B48", "#445069",
    "#5B9A8B", "#1C6758", "#3D8361", "#D6CDA4",
  ];
  const randomIndex = Math.floor(Math.random() * palettes.length);

  // Return the selected color palette
  return palettes[randomIndex];
}

/**
 * Extrat initials from given name
 * @param name - name of the individual
 * @returns initials of the provided name
 */
function getInitials(name: string): string {
  const names: Array<string> = name.split(" ");
  return names.slice(Math.max(names.length - 2, 1)).map((n) => n[0]).join("");
}