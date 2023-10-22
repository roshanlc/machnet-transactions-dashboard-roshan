import { Box, Typography } from "@mui/material";

export default function Error404() {
  return (
    <Box textAlign="center" p={15}>
      <Typography variant="h2">404 Error: The page does not exist.</Typography>
      <Typography variant="h5">
        <a href="/">Click here to go to transactions page.</a>
      </Typography>
    </Box>
  );
}
