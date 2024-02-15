import { Box, Typography } from "@mui/material";

export default function Error404() {
  return (
    <Box textAlign="center" p={15}>
      <Typography variant="h4">
        You seem lost, my friend.
          (404 Error: The page does not exist)
      </Typography>
      <Box mt={1} />
      <a href="/">
        <Typography variant="h4">
          Click here to go to transactions page.
        </Typography>
      </a>
    </Box>
  );
}
