import React, { useState, useEffect, useRef } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertColor, AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const useAlert = () => {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<AlertColor>("success");
  const [message, setMessage] = useState<string[]>([]);
  const timeoutRef = useRef<null | NodeJS.Timeout>(null);

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current as NodeJS.Timeout);
  }, []);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setMessage([]);
    setOpen(false);
  };

  const showAlert = (message: string[], type: AlertColor) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setOpen(true);
    setMessage(message);
    setType(type);
    timeoutRef.current = setTimeout(() => {
      handleClose();
    }, 5000);
  };

  const AlertComponent = () => {
    return (
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={type} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    );
  };
  return [AlertComponent, showAlert];
};
export default useAlert;
