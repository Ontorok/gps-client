import { Button } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import imgSrc from "../assets/images/img_avatar.png";
import classes from "../styles/Profile.module.css";

const Profile = () => {
  const { authUser } = useSelector(({ auth }) => auth);
  return (
    <div className={classes.profileContainer}>
      <div className={classes.profileLeft}>
        <div className={classes.profileItem}>
          <span>Name</span>
          <span>:</span>
          <span>Nasir Ahmed</span>
        </div>
        <div className={classes.profileItem}>
          <span>Email</span>
          <span>:</span>
          <span>nasir@mail.com</span>
        </div>
        <div className={classes.profileItem}>
          <span>Phone</span>
          <span>:</span>
          <span>+880 1x xxx-xxx</span>
        </div>
        {authUser.name === "admin" && (
          <div>
            <Button color="error" variant="contained">
              Force Restart
            </Button>
          </div>
        )}
      </div>
      <div className={classes.profileRight}>
        <img src={imgSrc} alt="nasir" />
      </div>
    </div>
  );
};

export default Profile;
