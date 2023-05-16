import React, { useEffect, useState } from "react";
import { UserRoles } from "../data/DTO/Roles";
import { appRoutes } from "../data/constants/appRoutes";
import useRoleRedirect from "../hooks/userRedirectRole";
import { useNavigate } from "react-router-dom";
import {
  useGetPositionsQuery,
  usePostPositionsMutation,
  useDeletePositionMutation,
} from "../services/positions.service";
import { AddCircle, Delete, Edit, Save } from "@mui/icons-material";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Box,
  CircularProgress,
  Grid,
  Chip,
  Button,
  Modal,
} from "@mui/material";
import { JobToPost } from "../data/DTO/JobToPost";
import PositionPopup from "../components/Popups/PositionPopup";
import { getCreatedDate } from "../utils/utility";
import { LoadingButton } from "@mui/lab";
import useAlert from "../components/Alerts/useAlert";
import EditPositionPopup from "../components/Popups/EditPositionPopup";
import PositionCard from "../components/PositionCard";

function SquadLeadLanding() {
  const [AlertComponent, showAlert] = useAlert();
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
  const [deletePos, deletePosRes] = useDeletePositionMutation({});
  const { data, isSuccess, isLoading } = useGetPositionsQuery({});
  const [openEdit, setopenEdit] = useState(false);
  const [openDelete, setopenDelete] = useState(false);
  const [open, setopen] = useState(false);
  const [positionId, setPostionId] = useState("");
  const [errorMessages, seterrorMessages] = useState([]);
  const navigate = useNavigate();
  const isAuthorized = useRoleRedirect(
    [UserRoles.SquadLead],
    appRoutes.SIGN_IN,
    navigate
  );

  const handleCloseDelete = () => setopenDelete(false);
  useEffect(() => {
    if (isSuccess) {
      console.log(data);
    }
  }, [isSuccess]);

  const removePosition = () => {
    deletePos(positionId as string);
    handleCloseDelete();
  };

  useEffect(() => {
    if (deletePosRes.isError) {
      const errorRes: any = deletePosRes.error;
      let data: any = [...errorMessages];
      errorRes.data.messages.map((message: any) => data.push(message.message));
      seterrorMessages(data);
      showAlert([data.join(" ")], "error");
      seterrorMessages([]);
    }
    if (deletePosRes.isSuccess) {
      showAlert([deletePosRes.data.messages[0].message], "success");
    }
  }, [deletePosRes]);

  return (
    <>
      <Box
        sx={{
          // marginLeft: "50%",
          display: "flex",
          flexGrow: 1,
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        {isLoading && <CircularProgress />}
        <Button
          variant="contained"
          startIcon={<AddCircle />}
          size="medium"
          onClick={() => setopen(true)}
        >
          Add a new job position
        </Button>
        {/* <Typography variant="h" component="div">
          Squad landing
        </Typography> */}
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <br />
              {isSuccess &&
                data.body.map((item: any) => (
                  <PositionCard jobPosition={item} />
                ))}
            </Grid>
          </Grid>
        </Box>
        <PositionPopup add={true} open={open} setOpen={setopen} />
      </Box>
      <Modal
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure you want to delete this skill?
          </Typography>
          <br />
          <Box sx={{ mt: 3 }}>
            <LoadingButton
              loading={deletePosRes.isLoading}
              loadingPosition="start"
              startIcon={deletePosRes.isLoading ? <Save /> : null}
              variant="contained"
              onClick={removePosition}
              size="small"
            >
              Confirm
            </LoadingButton>
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
    </>
  );
}

export default SquadLeadLanding;
