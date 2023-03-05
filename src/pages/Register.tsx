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
  Modal,
  Fade,
  Button,
  Typography,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  Divider,
  TextField,
  Grid,
  MenuItem,
} from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { Formik, FormikHelpers } from "formik";
import { LoadingButton } from "@mui/lab";
import SideMenu from "../components/Menus/SideMenu";
import { workLocations } from "../data/constants";
import { usePostUserMutation } from "../services/user.service";

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
  const [postUser, { isLoading, isSuccess }] = usePostUserMutation();

  return (
    <>
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
            initialValues={{
              candidateName: "",
              email: "",
              password: "",
              phone: "",
              squadLead: "",
              work_title: "",
              work_location: "",
            }}
            onSubmit={(values, { setSubmitting }) => {
              // postUser({
              //   name: values.candidateName,
              //   work_title: values.work_title,
              //   phone: values.phone,
              //   work_location: values.work_location,
              //   email: values.email,
              //   password: values.password,
              //   role_name: "operation",
              // squad_lead: values.squadLead,
              // });

              console.log("~", values);
              setTimeout(() => {
                setSubmitting(false);
              }, 400);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box>
                  <TextField
                    name="candidateName"
                    id="filled-basic"
                    label="Name"
                    variant="filled"
                    onChange={handleChange}
                    fullWidth
                    value={values.candidateName}
                    // onChange={(e) => setuserEmail(e.target.value)}
                  />
                </Box>
                <br />
                <Box>
                  <TextField
                    name="email"
                    id="filled-basic"
                    label="Email"
                    variant="filled"
                    onChange={handleChange}
                    fullWidth
                    value={values.email}
                    // onChange={(e) => setuserEmail(e.target.value)}
                  />
                </Box>
                <br />
                <Box>
                  <TextField
                    name="password"
                    id="filled-basic"
                    label="Password"
                    variant="filled"
                    onChange={handleChange}
                    fullWidth
                    type="password"
                    value={values.password}
                    // onChange={(e) => setuserPassword(e.target.value)}
                  />
                </Box>
                <br />
                <Box>
                  <TextField
                    name="phone"
                    id="filled-basic"
                    label="Phone"
                    variant="filled"
                    onChange={handleChange}
                    fullWidth
                    type="text"
                    value={values.phone}
                    // onChange={(e) => setuserPassword(e.target.value)}
                  />
                </Box>
                <br />
                <Box>
                  <TextField
                    name="squadLead"
                    id="filled-basic"
                    label="SquadLead"
                    variant="filled"
                    onChange={handleChange}
                    fullWidth
                    type="text"
                    value={values.squadLead}
                    // onChange={(e) => setuserPassword(e.target.value)}
                  />
                </Box>
                <br />
                <Box>
                  <TextField
                    name="work_title"
                    id="filled-basic"
                    label="Work Title"
                    variant="filled"
                    onChange={handleChange}
                    fullWidth
                    type="text"
                    value={values.work_title}
                    // onChange={(e) => setuserPassword(e.target.value)}
                  />
                </Box>
                <br />
                <TextField
                  name="work_location"
                  id="filled-select-currency"
                  select
                  label="Select work location"
                  defaultValue=""
                  variant="filled"
                  value={values.work_location}
                  onChange={handleChange}
                  fullWidth
                >
                  {workLocations.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <br />
                <br />
                <Button
                  variant="contained"
                  size="medium"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Confirm
                </Button>
              </form>
            )}
          </Formik>
        </Box>
      </Box>
    </>
  );
}
