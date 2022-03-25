import { Delete, Edit, Visibility } from "@mui/icons-material";
import { Button, ButtonGroup, Tooltip } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";

const useStyles = makeStyles((theme) => ({
  btnViewChild: {
    fill: "#1976D2",
  },
  btnViewParent: {
    "&:hover": {
      backgroundColor: "#1976D2",
      "& $btnViewChild": {
        fill: "#FFFFFF",
      },
    },
  },
  btnEditChild: {
    fill: "#4CAF50",
  },
  btnEditParent: {
    "&:hover": {
      backgroundColor: "#4CAF50",
      "& $btnEditChild": {
        fill: "#FFFFFF",
      },
    },
  },
  btnDeleteChild: {
    fill: "#F44336",
  },
  btnDeleteParent: {
    "&:hover": {
      backgroundColor: "#F44336",
      "& $btnDeleteChild": {
        fill: "#FFFFFF",
      },
    },
  },
}));

const ActionButtonGroup = ({
  appearedViewButton,
  appearedEditButton,
  appearedDeleteButton,
  onView,
  onEdit,
  onDelete,
}) => {
  const classes = useStyles();
  return (
    <ButtonGroup size="small">
      {appearedViewButton && (
        <Tooltip arrow title="View" placement="bottom">
          <Button className={classes.btnViewParent} onClick={onView}>
            <Visibility className={classes.btnViewChild} />
          </Button>
        </Tooltip>
      )}
      {appearedEditButton && (
        <Tooltip arrow title="Edit" placement="bottom">
          <Button className={classes.btnEditParent} onClick={onEdit}>
            <Edit className={classes.btnEditChild} />
          </Button>
        </Tooltip>
      )}
      {appearedDeleteButton && (
        <Tooltip arrow title="Delete" placement="bottom">
          <Button className={classes.btnDeleteParent} onClick={onDelete}>
            <Delete className={classes.btnDeleteChild} />
          </Button>
        </Tooltip>
      )}
    </ButtonGroup>
  );
};

export default ActionButtonGroup;
