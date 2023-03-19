import * as React from "react";
import { Alert, AlertTitle, Stack } from "@mui/material";
export default function DescriptionAlerts() {
  return (
    <Stack sx={{ width: "50%", height: "55vh" }} m="auto" spacing={2}>
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        Something went wrong!
      </Alert>
    </Stack>
  );
}
