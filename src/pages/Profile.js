import React from "react";
import imgSrc from "../assets/images/img_avatar.png";
import classes from "../styles/Profile.module.css";

const Profile = () => {
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
      </div>
      <div className={classes.profileRight}>
        <img src={imgSrc} alt="nasir" />
      </div>
    </div>
  );
};

export default Profile;
