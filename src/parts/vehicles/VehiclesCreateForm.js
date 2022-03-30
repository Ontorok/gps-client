import { Cancel, Save } from "@mui/icons-material";
import {
    Button,
    Checkbox,
    FormControlLabel,
    Grid,
    Paper,
    TextField
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useRef } from "react";
import CustomAutoComplete from "../../components/CustomAutoComplete";

const entryTypeArray = [
  { label: "Funded", value: "Funded" },
  { label: "Non-Funded", value: "Non-Funded" },
];

const groomerArray = [
  { label: "Groomer01", value: "Groomer01" },
  { label: "Groomer02", value: "Groomer02" },
];
const operatorArray = [
  { label: "User", value: "User" },
  { label: "Admin", value: "Admin" },
];

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 300,
    },
    btnChild: {
      fill: '#62AD2D',
    },
    btnCancel: {
      fill: '#FF867C',
    },
    buttonSave: {
      border: 'none',
      backgroundColor: '#FFFFFF',
      color: '#62AD2D',
      '&:hover': {
        backgroundColor: '#62AD2D',
        color: '#FFFFFF',
        border: 'none',
        '& $btnChild': {
          fill: '#FFFFFF'
        }
      }
    },
    buttonCancel: {
      border: 'none',
      backgroundColor: '#FFFFFF',
      color: '#FF867C',
      '&:hover': {
        backgroundColor: '#FF867C',
        color: '#FFFFFF',
        border: 'none',
        '& $btnCancel': {
          fill: '#FFFFFF'
        }
      }
    },
  }));

const VehiclesCreateForm = () => {
  const classes = useStyles();

    //#region hooks
  const refEntryType = useRef();
  const refGroomerName = useRef();
  const refOperator = useRef();
  //#endregion
  
  return (
    <div style={{ paddingTop: 15 }}>
      <h2 style={{ textAlign: "center", padding: 15 }}>Vehicles Form</h2>
      <Paper style={{padding:10}}>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="datetime-local"
                size="small"
                margin="dense"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                size="small"
                margin="dense"
                label="Club Name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                size="small"
                margin="dense"
                label="Eligible Time"
              />
            </Grid>
            <Grid item xs={12}>
            <CustomAutoComplete
                name="operator"
                label="Operator"
                data={operatorArray}
                innerref={refOperator}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                size="small"
                margin="dense"
                label="Cost"
                disabled
              />
            </Grid>
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Grid item xs={12}>
            <CustomAutoComplete
                name="groomerName"
                label="Groomer Name"
                data={groomerArray}
                innerref={refGroomerName}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomAutoComplete
                name="club"
                label="Entry Type"
                data={entryTypeArray}
                innerref={refEntryType}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth size="small" margin="dense" label="Trail" />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                size="small"
                margin="dense"
                label="Country"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Is Valid"
                color="success"
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid container justifyContent='flex-end' gap={3}>
        <Button variant="contained" endIcon={<Save className={classes.btnChild} />} className={classes.buttonSave} >Save</Button>
        <Button variant="contained" endIcon={<Cancel className={classes.btnCancel} />} className={classes.buttonCancel} >Cancel</Button>
      </Grid>
      </Paper>
    </div>
  );
};

export default VehiclesCreateForm;
