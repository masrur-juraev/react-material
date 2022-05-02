import React, {useEffect, useState} from 'react'
import {
  Box,
  Grid,
  Typography,
  Container,
  Button,
  Stack,
  Divider, Dialog, DialogTitle, DialogContent, DialogContentText, Snackbar,
} from '@material-ui/core'
import {useDispatch, useSelector} from "react-redux";
import {apiClient} from "../../../utils/api";
import SplitPane from "react-split-pane";
import {makeStyles} from "@mui/styles";
import {onGetRotorMainImage} from "../../../store/actions/rotor";
import useAuth from "../../../hooks/useAuth";
import Alert from "@material-ui/core/Alert/Alert";

const useStyles = makeStyles(() => ({
  root: {
    height: 'inherit',
    marginLeft: '0px!important'
  },
  splitPane: {
    position: 'unset!important'
  }
}));

export default function RotorImages(props) {
  const classes = useStyles();
  const { idToken } = useAuth();
  const dispatch = useDispatch();
  const [open,setOpen]=React.useState(false);
  const { newMachineID, loadedMachine } = useSelector(state => state.machine);
  const {
    rotorSlotImageURL, rotorConductorImageURL, rotorHoleImageURL, rotorMainImageURL
  } = useSelector(state => state.rotor);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');

  useEffect(() => {
    const currentMachineID = newMachineID ? newMachineID : loadedMachine.id;
    if (rotorHoleImageURL) {
      dispatch(onGetRotorMainImage(currentMachineID));
    } else if (rotorSlotImageURL && rotorConductorImageURL) {
      dispatch(onGetRotorMainImage(currentMachineID));
    }
  }, [rotorHoleImageURL, rotorSlotImageURL, rotorConductorImageURL, newMachineID, loadedMachine]);

  const handleUpdateView = async () => {
    try {
      const currentMachineID = newMachineID ? newMachineID : loadedMachine.id;
      const response = await apiClient(idToken).get(`/machine/dimensions/${currentMachineID}/create_machine_image`);
      if (response.data.error) {
        setAlertMsg(response.data.error);
        setShowAlert(true);
      }
      dispatch(onGetRotorMainImage(currentMachineID));
    } catch (error) {
      setAlertMsg('Something went wrong, please try again!');
      setShowAlert(true);
    }
    // if (error_message!==null) {
    //   return(
    //     <Dialog
    //       open={open}
    //       onClose={handleClose}
    //       aria-labelledby="alert-dialog-title"
    //       aria-describedby="alert-dialog-description">
    //       <DialogTitle id="alert-dialog-title">
    //         {error_message}
    //       </DialogTitle>
    //       <DialogContent>
    //         <DialogContentText id="alert-dialog-description">
    //           Hello User, Please enter proper dimensions
    //         </DialogContentText>
    //       </DialogContent>
    //     </Dialog>
    //   );
    // } else {
    //   return (
    //     <Typography>
    //       You have entered valid dimensions!
    //     </Typography>
    //   )
    // }
  };

  const onCloseAlert = () => {
    setAlertMsg('');
    setShowAlert(false);
  };

  return (
    <Grid container className={classes.root} spacing={4}>
      <SplitPane className={classes.splitPane} split="vertical" minSize={200} defaultSize={300}>
        <Stack spacing={3} justifyContent="center" sx={{ mt: 10 }}>
          {rotorHoleImageURL && (
            <Stack spacing={2}>
              <Typography align="center" fontSize={18} fontWeight={900}>
                Hole Image
              </Typography>
              <Box component="img" src={rotorHoleImageURL} />
            </Stack>
          )}
          {(rotorSlotImageURL || rotorConductorImageURL) && (
            <>
              {rotorSlotImageURL && (
                <Stack spacing={2}>
                  <Typography align="center" fontSize={18} fontWeight={900}>
                    Slot Image
                  </Typography>
                  <Box component="img" src={rotorSlotImageURL} />
                </Stack>
              )}
              <Divider />
              {rotorConductorImageURL && (
                <Stack spacing={2}>
                  <Typography align="center" fontSize={18} fontWeight={900}>
                    Conductor Image
                  </Typography>
                  <Box component="img" src={rotorConductorImageURL} />
                </Stack>
              )}
            </>
          )}
        </Stack>
        <Container>
          {rotorMainImageURL && (
            <Stack spacing={4} justifyContent="center" sx={{ mt: 10 }}>
              <Stack spacing={2}>
                <Typography align="center" fontSize={18} fontWeight={900}>
                  Axial View
                </Typography>
                <Stack direction="row" justifyContent="center">
                <Box component="img" src={rotorMainImageURL} height={400} width={400}/>
                </Stack>
              </Stack>

              <Stack direction="row" justifyContent="center">
                <Button variant="contained" onClick={handleUpdateView}>
                  Update View
                </Button>
              </Stack>
            </Stack>
          )}
        </Container>
      </SplitPane>
      <Snackbar
        open={showAlert}
        autoHideDuration={5000}
        onClose={onCloseAlert}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
      >
        <Alert onClose={onCloseAlert} severity="error">
          {alertMsg}
        </Alert>
      </Snackbar>
    </Grid>
  )
}
