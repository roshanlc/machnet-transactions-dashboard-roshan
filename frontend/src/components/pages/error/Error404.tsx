import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Error404() {

  return (
    <Box textAlign="center" p={15}>
      <Typography variant="h4">
        You seem lost, my friend.
        (404 Error: The page does not exist)
      </Typography>
      <Box mt={1} />
      <Link to="/">
        <Typography variant="h5">
          Click here to go to transactions page.
        </Typography>
      </Link>
    </Box>
  );
}
