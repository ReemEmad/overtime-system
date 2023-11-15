import React, { useEffect } from "react";
import { useGetPendingJobQuery } from "../services/cfo.service";
import { Box, CircularProgress } from "@mui/material";
import PositionCard from "../components/PositionCard";

function CfoLanding() {
  const { data, isSuccess, isLoading } = useGetPendingJobQuery({});

  return (
    <>
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress color="primary" />
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexGrow: 1,
            justifyContent: "start",
            alignItems: "center",
            gap: "30px",
            flexWrap: "wrap",
          }}
        >
          {isSuccess &&
            data.body.map((item: any) => (
              <PositionCard jobPosition={item} cfo={true} />
            ))}
        </Box>
      )}
    </>
  );
}

export default CfoLanding;
