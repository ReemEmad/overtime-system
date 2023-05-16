import React, { useState } from "react";
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
import { Edit } from "@mui/icons-material";
import { getCreatedDate } from "../utils/utility";
import EditPositionPopup from "./Popups/EditPositionPopup";

function PositionCard(props: { jobPosition: any }) {
  const { jobPosition: item } = props;
  const [openEdit, setopenEdit] = useState(false);
  return (
    <>
      <Card sx={{ width: 270 }} key={item.id}>
        <CardContent>
          <Typography gutterBottom color="text.secondary">
            created on:
            {getCreatedDate(item.job_created_date)}
          </Typography>
          <Typography variant="body1">{item.job_name}</Typography>
          <Typography variant="caption" align="right">
            {item.project_name}
          </Typography>

          <br />
          <br />
          <Typography variant="caption" align="right">
            skills required: {""}
          </Typography>
          {item.skill_names.map((skill: any) => (
            <Chip label={skill} key={skill} />
          ))}
        </CardContent>
        <CardActions>
          <Chip size="small" label={item.job_status} color="info" />
          <Box
            sx={{
              display: "flex",
              alignItems: "right",
              pl: "65%",
              pb: 1,
            }}
          >
            <Edit
              color="success"
              onClick={() => {
                setopenEdit(true);
              }}
            />
            {/* <Delete
                            color="error"
                            onClick={() => {
                              setopenDelete(true);
                              setPostionId(item.job_id);
                            }}
                          /> */}
            {/* {props.children} */}
          </Box>
        </CardActions>

        {/* <PositionPopup
                        edit={true}
                        open={openEdit}
                        setOpen={setopenEdit}
                        position={item}
                      /> */}
      </Card>
      <EditPositionPopup
        open={openEdit}
        setOpen={setopenEdit}
        position={item}
      />
    </>
  );
}

export default PositionCard;
