import React from "react";
import { makeStyles, useTheme } from "@mui/styles";
import Avatar from "@mui/material/Avatar";
import { stringAvatar } from "../utils/utility";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    alignItems: "center",
    margin: "5px 0px 0px 5px",
  },
  avatar: {
    width: 5,
    height: 5,
    position: "relative",
    zIndex: 1,
    "&:hover": {
      transform: "scale(1.2)",
      zIndex: 2,
    },
  },
}));

type Props = {
  users: any[];
};

const OverlappingAvatars = ({ users }: Props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {users?.map((user: any, index: number) => (
        <div key={user.id} style={{ marginLeft: -16 * index }}>
          <Avatar
            className={classes.avatar}
            alt={user.name}
            src={user.avatarUrl}
            {...stringAvatar(user.name)}
          />
        </div>
      ))}
    </div>
  );
};

export default OverlappingAvatars;
