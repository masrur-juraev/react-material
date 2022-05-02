import React, {useEffect, useState} from 'react'
import {
  Box,
  Grid,
  Typography,
  Container,
  Button,
  Stack,
  Divider, Snackbar,
} from '@material-ui/core'
import {useDispatch, useSelector} from "react-redux";
import {apiClient} from "../../../utils/api";
import SplitPane from "react-split-pane";
import {makeStyles} from "@mui/styles";
import {onGetStatorMainImage} from "../../../store/actions/stator";
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

export default function StatorImages(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { idToken } = useAuth();
  const {newMachineID, loadedMachine } = useSelector(state => state.machine);
  const {
    statorSlotImageURL, statorConductorImageURL, statorMainImageURL
  } = useSelector(state => state.stator);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');

  useEffect(() => {
    if (statorSlotImageURL && statorConductorImageURL) {
      const currentMachineID = newMachineID ? newMachineID : loadedMachine.id;
      dispatch(onGetStatorMainImage(currentMachineID));
    }
  }, [dispatch, statorSlotImageURL, statorConductorImageURL, newMachineID, loadedMachine]);

  const handleUpdateView = async () => {
    try {
      const currentMachineID = newMachineID ? newMachineID : loadedMachine.id;
      const response = await apiClient(idToken).get(`/machine/dimensions/${currentMachineID}/create_machine_image`);
      if (response.data.error) {
        setAlertMsg(response.data.error);
        setShowAlert(true);
      }
      dispatch(onGetStatorMainImage(currentMachineID));
    } catch (error) {
      setAlertMsg('Something went wrong, please try again!');
      setShowAlert(true);
    }
  };

  const onCloseAlert = () => {
    setAlertMsg('');
    setShowAlert(false);
  };

  return (
    <Grid container className={classes.root} spacing={4}>
      <SplitPane className={classes.splitPane} split="vertical" minSize={200} defaultSize={300} maxSize={450}>
        <Stack spacing={3} justifyContent="center" sx={{ mt: 10 }}>
          {statorSlotImageURL && (
            <Stack spacing={2}>
              <Typography align="center" fontSize={18} fontWeight={900}>
                Slot Image
              </Typography>
              <Box component="img" src={statorSlotImageURL} />
            </Stack>
          )}
          {(statorSlotImageURL || statorConductorImageURL) && <Divider />}
          {statorConductorImageURL && (
            <Stack spacing={2}>
              <Typography align="center" fontSize={18} fontWeight={900}>
                Conductor Image
              </Typography>
              <Box component="img" src={statorConductorImageURL} />
            </Stack>
          )}
        </Stack>
        <Container>
          {statorMainImageURL && (
            <Stack spacing={4} justifyContent="center" sx={{ mt: 10 }}>
              <Stack spacing={2}>
                <Typography align="center" fontSize={18} fontWeight={900}>
                  Axial View
                </Typography>
                <Stack direction="row" justifyContent="center">
                <Box component="img" src={statorMainImageURL} height={400} width={400}/>
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
