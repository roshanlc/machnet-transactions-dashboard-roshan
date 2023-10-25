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
const AccountDetails = () => {
  return (
    <Box className="account-details">
      <Typography variant="h6">From AR</Typography>
      <Typography variant="body1">Mercury Checking **123</Typography>
      <Typography variant="body1">Oct 10 at 7:42PM</Typography>
      <Typography variant="h6" mt={1}>
        To Ops / Payroll
      </Typography>
      <Typography variant="body1">Mercury Checking **123</Typography>
      <Typography variant="body1">Oct 10 at 7:42PM</Typography>
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
          <CardHeader className="MuiCard-header" title="Transfer" />
        </DialogTitle>
        <DialogContent sx={{ marginTop: -2 }}>
          <CardContent className="MuiCard-content">
            <Typography variant="h5">- $56,878.90</Typography>
            <AccountDetails />
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
              MERCURY_WELISENND9SV9
              <br />
              REF#8787
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
