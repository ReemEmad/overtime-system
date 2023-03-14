import React, { ReactNode, Dispatch, SetStateAction } from "react";
import { Modal, Box, Button, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

type DeletePopup = {
  openDelete: boolean;
  DeleteModalTitle: string;
  handleOpenDelete: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
};

const DeletePopup = ({
  openDelete,
  DeleteModalTitle,
  handleOpenDelete,
  children,
}: DeletePopup) => {
  const handleCloseDelete = () => {
    handleOpenDelete(false);
  };
  return (
    <Modal
      open={openDelete}
      onClose={handleCloseDelete}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          // color=""
        >
          {DeleteModalTitle}
        </Typography>
        <br />
        <Box sx={{ mt: 3 }}>
          {children}
          <Button
            variant="contained"
            onClick={handleCloseDelete}
            sx={{ mx: 1 }}
            size="small"
            color="error"
          >
            Cancel
          </Button>
        </Box>
        <Box></Box>
      </Box>
    </Modal>
  );
};

export default DeletePopup;
