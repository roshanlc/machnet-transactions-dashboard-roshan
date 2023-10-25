import {
  Card,
  CardHeader,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Divider,
  Typography,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "./demo.css";
import Textarea from "@mui/joy/Textarea";
const AccountDetails = ({ data }) => {
  return (
    <Box className="account-details">
      <Typography variant="h6">
        From {data?.FromAccount?.Customer?.name || "Sender"}
      </Typography>
      <Typography variant="body1">
        {data?.FromAccount?.Customer?.Bank?.name || "Bank"}{" "}
        {data?.FromAccount?.number || "Acc Num"}
      </Typography>
      <Typography variant="body1">
        {new Date(data?.Date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })}{" "}
        at{" "}
        {new Date(data?.Date).toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "numeric",
        })}
      </Typography>

      <Typography variant="h6" mt={1}>
        To {data?.ToAccount?.Customer?.name || "Sender"}
      </Typography>
      <Typography variant="body1">
        {data?.ToAccount?.Customer?.Bank?.name || "Bank"}{" "}
        {data?.ToAccount?.number || "Acc Num"}
      </Typography>
      <Typography variant="body1">
        {new Date(data?.Date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })}{" "}
        at{" "}
        {new Date(data?.Date).toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "numeric",
        })}
      </Typography>
    </Box>
  );
};

export default function SingleTransactionDialog({
  dialogToggle = false,
  closeToggleFunc = () => {},
  rowData = null,
}) {
  return (
    <Card className="MuiCard-root">
      <Dialog
        open={dialogToggle}
        onClose={closeToggleFunc}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <CardHeader
            className="MuiCard-header"
            title={rowData?.row?.PaymentMethod?.method || "Payment Method"}
          />
        </DialogTitle>
        <DialogContent sx={{ marginTop: -2 }}>
          <CardContent className="MuiCard-content">
            <Typography
              variant="h4"
              color={rowData?.row?.Amount > 0 ? "green" : "error"}
            >
              {"$ "}
              {rowData?.row?.Amount}
            </Typography>
            <AccountDetails data={rowData?.row} />
          </CardContent>
          <Divider />
          <CardContent className="MuiCard-content">
            <Typography variant="subtitle1" color={"gray"}>
              Notes
            </Typography>
            <Textarea
              color="neutral"
              minRows={2}
              placeholder="Add a note"
              size="md"
              variant="outlined"
            />
            <Typography variant="body1" color={"GrayText"} mt={1}>
              + Add an attachment
            </Typography>

            <Typography variant="body1" color={"GrayText"} mt={1}>
              Bank description
            </Typography>

            <Typography variant="h6" mt={1}>
              XYZHBSHB_198NSHS78SB
              <br />
              REF#{858 * rowData?.row.ID || 585}
            </Typography>
          </CardContent>
        </DialogContent>
        <Divider />
        <DialogActions>
          <span>Press "ESC" or click "Close" to close the dialog.</span>
          <Button
            variant="outlined"
            startIcon={<CloseIcon />}
            onClick={closeToggleFunc}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}
