import * as React from "react";
import {
  Dispatch,
  SetStateAction,
  useState,
  forwardRef,
  useEffect,
} from "react";
import {
  Box,
  Typography,
  Divider,
  TextField,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";

import { Formik } from "formik";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";
import { useGetJobsQuery } from "../services/job.service";
import {
  useGetSquadLeadsQuery,
  useRegisterCandidateMutation,
} from "../services/user.service";
import { Save } from "@mui/icons-material";
import { appRoutes } from "../data/constants/appRoutes";
import { UserRoles } from "../data/DTO/Roles";

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
interface Values {
  firstName: string;
  lastName: string;
  email: string;
}

export default function Register() {
  const { data: jobPositions, isSuccess: isGetSuccess } = useGetJobsQuery({
    page_number: 0,
    page_size: 0,
  });
  const [openError, setopenError] = useState(false);
  const [registerUser, registerUserRes] = useRegisterCandidateMutation();

  const [squadLeads, setsquadLeads] = useState([]);
  const { data, isSuccess } = useGetSquadLeadsQuery({});
  const [offices, setoffices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      setsquadLeads(data.body);
    }
  }, [isSuccess]);

  const handleCloseModal = () => {
    setopenError(false);
  };

  const checkUserRoleAndRedirect = (userRole: UserRoles) => {
    console.log("hello");
    switch (userRole) {
      case UserRoles.Operation:
        navigate(appRoutes.CANDIDATE_SKILLS);
        break;
      case UserRoles.CFO:
        navigate(appRoutes.ADMIN_LANDING);
        break;
      case UserRoles.SquadLead:
        navigate(appRoutes.SQUADLEAD_LANDING);
        break;
      case UserRoles.Admin:
        navigate(appRoutes.ADMIN_LANDING);
        break;
      default:
        "";
        break;
    }
    return;
  };

  useEffect(() => {
    const constants = JSON.parse(localStorage.getItem("constants")!);
    setoffices(constants?.offices);
  }, []);

  useEffect(() => {
    if (registerUserRes.isSuccess) {
      console.log(
        "🚀 ~ file: Register.tsx:100 ~ useEffect ~ registerUserRes:",
        registerUserRes
      );
      const response: any = registerUserRes.data.body;
      localStorage.setItem("userData", JSON.stringify(response));
      checkUserRoleAndRedirect(response.role);
    }
  }, [registerUserRes.isSuccess]);

  useEffect(() => {
    if (registerUserRes.isError) {
      setopenError(true);
    }
  }, [registerUserRes.isError]);

  return (
    <>
      <Snackbar
        open={openError}
        autoHideDuration={2000}
        onClose={handleCloseModal}
      >
        <Alert
          onClose={handleCloseModal}
          severity="error"
          sx={{ width: "100%" }}
        >
          please check your data
        </Alert>
      </Snackbar>
      <Box
        sx={{
          display: "flex",
          placeItems: "center",
          justifyContent: "center",
          gap: "40px",
          margin: "auto",
          height: "100vh",
        }}
      >
        <Box>
          <img
            width="400px"
            src="https://social.engagedly.com/uploads/62f54b89-db72-4076-9499-3547c51de48a/62f54b89-db72-4076-9499-3547c51de48a/social/picture/file/4254624/reduced_Integrant-Brand-Logo-Colored-2020.png"
          />
        </Box>
        <Divider orientation="vertical" />
        <Box>
          <Typography
            component="div"
            variant="h5"
            textAlign="left"
            color="GrayText"
            mb={3}
          >
            Regsiter a new account
          </Typography>
          <Formik
            enableReinitialize={true}
            initialValues={{
              candidateName: "",
              email: "",
              password: "",
              phone: "",
              squadLead: "",
              work_title: "",
              work_location: "",
            }}
            onSubmit={async (values) => {
              console.log(
                "🚀 ~ file: Register.tsx:177 ~ onSubmit={ ~ values:",
                values
              );
              await registerUser({
                name: values.candidateName,
                work_title: "Senior Software Engineer",
                phone: values.phone,
                work_location: values.work_location,
                email: values.email,
                password: values.password,
                squadLead: values.squadLead,
              });
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleSubmit,
              isSubmitting,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box>
                  <TextField
                    name="candidateName"
                    id="outlined-basic"
                    label="Name"
                    variant="outlined"
                    onChange={handleChange}
                    fullWidth
                    value={values.candidateName}
                  />
                </Box>
                <br />
                <Box>
                  <TextField
                    name="email"
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    onChange={handleChange}
                    fullWidth
                    value={values.email}
                  />
                </Box>
                <br />
                <Box>
                  <TextField
                    name="password"
                    id="outlined-basic"
                    label="Password"
                    variant="outlined"
                    onChange={handleChange}
                    fullWidth
                    type="password"
                    value={values.password}
                  />
                </Box>
                <br />
                <Box>
                  <TextField
                    name="phone"
                    id="outlined-basic"
                    label="Phone"
                    variant="outlined"
                    onChange={handleChange}
                    fullWidth
                    type="text"
                    value={values.phone}
                  />
                </Box>
                <br />
                <Box>
                  <TextField
                    name="squadLead"
                    id="demo-simple-select"
                    label="Select Squad Lead"
                    select
                    variant="outlined"
                    onChange={handleChange}
                    fullWidth
                    type="text"
                    value={values.squadLead}
                  >
                    {squadLeads.map((option: any) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
                <br />
                <Box>
                  <TextField
                    name="work_title"
                    id="demo-simple-select"
                    label="Work Title"
                    select
                    variant="outlined"
                    onChange={handleChange}
                    fullWidth
                    type="text"
                    value={values.work_title}
                  >
                    {isGetSuccess &&
                      jobPositions?.body.map((option: any) => (
                        <MenuItem key={option.id} value={option.name}>
                          {option.name}
                        </MenuItem>
                      ))}
                  </TextField>
                </Box>
                <br />
                <TextField
                  name="work_location"
                  id="demo-simple-select"
                  select
                  label="Select work location"
                  defaultValue=""
                  variant="outlined"
                  value={values.work_location}
                  onChange={handleChange}
                  fullWidth
                >
                  {offices.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
                <br />
                <br />
                <LoadingButton
                  loading={registerUserRes.isLoading}
                  loadingPosition="start"
                  startIcon={registerUserRes.isLoading ? <Save /> : null}
                  variant="contained"
                  type="submit"
                >
                  Confirm
                </LoadingButton>
              </form>
            )}
          </Formik>
        </Box>
      </Box>
    </>
  );
}

