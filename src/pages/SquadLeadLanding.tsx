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
      <Box>
        <Button
          variant="contained"
          startIcon={<AddCircle />}
          size="medium"
          onClick={() => setopen(true)}
        >
          Add a new job
        </Button>
        <br />
      </Box>

      <Box
        sx={{
          // marginLeft: "50%",
          display: "flex",
          flexGrow: 1,
          // flexDirection: "column",
          justifyContent: "start",
          alignItems: "center",
          gap: "30px",
          flexWrap: "wrap",
        }}
      >
        {isSuccess &&
          data.body.map((item: any) => <PositionCard jobPosition={item} />)}
      </Box>

      <PositionPopup add={true} open={open} setOpen={setopen} />
      <p style={{ margin: "auto" }}> {isLoading && <CircularProgress />}</p>
    </>
  );
}

export default SquadLeadLanding;
