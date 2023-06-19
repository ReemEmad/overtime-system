import React, { useEffect } from "react";
import { useGetApprovedPositionsQuery } from "../services/positions.service";
import PositionCard from "../components/PositionCard";
import { Box } from "@mui/material";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";

function ApprovedPositions() {
  const { data, isSuccess, isLoading } = useGetApprovedPositionsQuery({});

  useEffect(() => {
    if (isSuccess) {
      console.log(data);
    }
  }, []);

  return (
    <>
      {isLoading ? (
        <CircularProgress />
      ) : (
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
      )}
    </>
  );
}

export default ApprovedPositions;
