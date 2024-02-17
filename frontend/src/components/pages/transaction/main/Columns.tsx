import { Avatar, Box, Chip, Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import PendingIcon from '@mui/icons-material/Pending';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { East, RequestPage, SendSharp, West } from "@mui/icons-material";
import { getRandomColor, getInitials } from "../utils/utils";

// columns for data grid
export const gridColumns: GridColDef[] = [
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
                    <sup style={{ fontSize: "0.83rem" }}>
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
