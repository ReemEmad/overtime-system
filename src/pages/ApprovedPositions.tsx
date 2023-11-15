import React, { useEffect, useState } from "react";
import { useGetApprovedPositionsQuery } from "../services/positions.service";
import PositionCard from "../components/PositionCard";
import { Box } from "@mui/material";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import OverlappingAvatars from "../components/OverlappingAvatars";

function ApprovedPositions() {
  const { data, isSuccess, isLoading } = useGetApprovedPositionsQuery({});
  const [approvedJobs, setapprovedJobs] = useState([]);

  useEffect(() => {
    if (isSuccess) {
      console.log("~", data);
      setapprovedJobs(data.body);
    }
  }, [isSuccess]);

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
          <CircularProgress color="secondary" />
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
              <>
                <PositionCard jobPosition={item} />
              </>
            ))}
        </Box>
      )}
    </>
  );
}

export default ApprovedPositions;
