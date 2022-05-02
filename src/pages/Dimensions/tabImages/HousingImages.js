import React, {useEffect, useState} from 'react'
import {
  Box,
  Grid,
  Typography,
  Container,
  Button,
  Stack,
  Snackbar
} from '@material-ui/core'
import {useDispatch, useSelector} from "react-redux";
import {apiClient} from "../../../utils/api";
import SplitPane from "react-split-pane";
import {makeStyles} from "@mui/styles";
import {onGetHousingMainImage} from "../../../store/actions/housing";
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

export default function HousingImages(props) {
  const classes = useStyles();
  const { idToken } = useAuth();
  const dispatch = useDispatch();
  const { newMachineID, loadedMachine } = useSelector(state => state.machine);
  const { housingImageURL, housingMainImageURL } = useSelector(state => state.housing);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');

  useEffect(() => {
    if (housingImageURL) {
      const currentMachineID = newMachineID ? newMachineID : loadedMachine.id;
      dispatch(onGetHousingMainImage(currentMachineID));
    }
  }, [housingImageURL, newMachineID, loadedMachine, dispatch]);

  const handleUpdateView = async () => {
    try {
      const currentMachineID = newMachineID ? newMachineID : loadedMachine.id;
      const response = await apiClient(idToken).get(`/machine/dimensions/${currentMachineID}/create_machine_image`);
      if (response.data.error) {
        setAlertMsg(response.data.error);
        setShowAlert(true);
      }
      dispatch(onGetHousingMainImage(currentMachineID));
    } catch (error) {
      setAlertMsg('Something went wrong, please try again!');
      setShowAlert(true);
    }
    // if (error_message !== null) {
    //   return (
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
    //
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
          {housingImageURL && (
            <Stack spacing={2}>
              <Typography align="center" fontSize={18} fontWeight={900}>
                Housing Image
              </Typography>
              <Box component="img" src={housingImageURL} />
            </Stack>
          )}
          {/*{(housingImageUrl || housingImageUrl) && <Divider />}*/}
          {/*{housingImageUrl && (*/}
          {/*    <Stack spacing={2}>*/}
          {/*      <Typography align="center" fontSize={18} fontWeight={900}>*/}
          {/*        Housing Input Parameters*/}
          {/*      </Typography>*/}
          {/*      <Box component="img" src={housingImageUrl} />*/}
          {/*    </Stack>*/}
          {/*)}*/}
        </Stack>
        <Container>
          {housingMainImageURL && (
            <Stack spacing={4} justifyContent="center" sx={{ mt: 10 }}>
              <Stack spacing={2}>
                <Typography align="center" fontSize={18} fontWeight={900}>
                  Axial View
                </Typography>
                  <Stack direction="row" justifyContent="center">
                <Box component="img" src={housingMainImageURL} height={400} width={400} />
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
