import React, {Suspense, useEffect, useRef, useState} from 'react'
// material
import {
  Alert,
  Box,
  Button,
  Card,
  Container, Snackbar,
  Stack,
  Table, TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow, TextField,
  Typography
} from '@material-ui/core'

// hooks

// components

import { PROJECT_NAME } from 'src/utils/constants'
import Page from "../../../components/Page";
import useSettings from "../../../hooks/useSettings";
import {useDispatch, useSelector} from "react-redux";
import {apiClient} from "../../../utils/api";
import useAuth from "../../../hooks/useAuth";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import {makeStyles} from "@mui/styles";
import {onSuccessLoadResults} from "../../../store/actions/results";
// import axios from 'axios';

const useStyles = makeStyles({
  solveButton: {
    backgroundColor: '#4caf50',
    '& hover': {
      backgroundColor: '#388e3c'
    }
  }
});

const SolveTable=()=> {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { themeStretch } = useSettings();
  const { idToken } = useAuth();
  const {newMachineID, loadedMachine } = useSelector(state => state.machine);
  console.log(newMachineID)
  const [loading,setLoading] = useState(false);
  const [success,setSuccess] = useState(false);
  const timer = useRef();
  const [TemperatureData, setTemperatureData] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const [alertType, setAlertType] = useState('success');

  useEffect(() => {
    setLoading(false);
  },[]);

  const getTemperatureData = async () => {
    setLoading(true);
    try {
      const currentMachineID = newMachineID ? newMachineID : loadedMachine.id;
      const response = await apiClient(idToken).get(`/machine/dimensions/${currentMachineID}/lptn_solve`);
      setTemperatureData(response.data);
      const responseImage = await apiClient(idToken).get(`/machine/dimensions/${currentMachineID}/lptn_results`);
      console.log(TemperatureData, response)
      setLoading(false);
      onShowAlert('success');
    } catch (error) {
      console.log(error);
      setLoading(false);
      onShowAlert('error');
    }
  };

  const onShowAlert = (type) => {
    if (type === 'success') {
      setAlertType('success');
      setAlertMsg('Data is fetched successfully');
      dispatch(onSuccessLoadResults(true));
    } else {
      setAlertType('error');
      setAlertMsg('Error occurred during load data');
      dispatch(onSuccessLoadResults(false));
    }
    setShowAlert(true);
  };

  const onCloseAlert = () => {
    setAlertMsg('');
    setShowAlert(false);
  };

  return (
    <Page title={`RESULTS | ${PROJECT_NAME}`}>
      <Backdrop open={loading} style={{ zIndex: 100000 }}>
        <CircularProgress size={120} />
      </Backdrop>

      <Snackbar
        open={showAlert}
        autoHideDuration={3000}
        onClose={onCloseAlert}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
      >
        <Alert onClose={onCloseAlert} severity={alertType}>
          {alertMsg}
        </Alert>
      </Snackbar>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h2" component="h1" paragraph>
          Results
        </Typography>
        <Typography variant="h3" component="h2" paragraph>
          Please Click here to view the data.
        </Typography>
        <Box sx={{m:1,position:'relative'}}>
          <Button
            className={classes.solveButton}
            disabled={loading}
            variant="contained"
            size="large"
            onClick={getTemperatureData}
          >
            Solve
          </Button>
        </Box>
      </Container>
      <br/><br/>
      <Stack spacing={2}>
        <h2 align="center">Temperatures</h2>

        <TableContainer component={Card}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ py: 1, width: '50%' }}>Component</TableCell>
                <TableCell sx={{ py: 1, width: '25%' }}>T_Max</TableCell>
                <TableCell sx={{ py: 1, width: '25%' }}>T_avg</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {TemperatureData &&
              Object.keys(TemperatureData).map((tempData,index) => {
                if (TemperatureData[tempData] !== 'AvgTemperature') {
                  if (TemperatureData[tempData] === 'MaxTemperature') {
                    return (
                      <TableRow key={tempData}>
                        <TableCell sx={{ py: 1 }}>
                          {tempData}
                        </TableCell>
                        <TableCell sx={{ py: 1 }}>
                          <TextField
                            type="text"
                            variant="outlined"
                            value="3"
                            size="small"
                          >
                          </TextField>
                        </TableCell>
                        <TableCell sx={{ py: 1 }}>
                          <TextField
                            type="text"
                            inputProps={{ min: 0 }}
                            size="small"
                            value="2"
                          />
                        </TableCell>
                      </TableRow>
                    )
                  } else {
                    return (
                      <TableRow key={tempData}>
                        <TableCell sx={{ py: 1 }}>
                          {tempData}
                        </TableCell>
                        <TableCell sx={{ py: 1 }}>
                          <TextField
                            type="text"
                            inputProps={{ min: 0 }}
                            size="small"
                            value={TemperatureData[tempData].MaxTemperature}
                          />
                        </TableCell>
                        <TableCell sx={{ py: 1 }}>
                          <TextField
                            type="text"
                            inputProps={{ min: 0 }}
                            size="small"
                            value={TemperatureData[tempData].AvgTemperature}
                          />
                        </TableCell>
                      </TableRow>

                    )
                  }
                } else if (TemperatureData[tempData] === '') {
                  return(
                    <Alert>
                      Please Click on the button to generate the new data
                    </Alert>
                  )
                }
              })}

              <TableRow>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </Page>
  )
};

export default SolveTable;