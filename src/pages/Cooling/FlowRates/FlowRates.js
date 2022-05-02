import React, {useCallback, useEffect, useState} from 'react'
import {
  Stack,
  TextField,
  MenuItem,
  TableContainer,
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  Card,
  Button,
  Container,
  Divider
} from '@material-ui/core'
import {FORM_DATA} from 'src/utils/constants'
import useError from 'src/hooks/useError'
import useCooling from "../../../hooks/useCooling";
import useImage from "../../../hooks/useImage";
import {apiClient} from "../../../utils/api";
import {useSelector} from "react-redux";
import useAuth from "../../../hooks/useAuth";
import Select from "@material-ui/core/Select";
import {makeStyles} from "@mui/styles";
import clsx from 'clsx';
import { withStyles } from '@material-ui/styles';
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

/* ----------------------------------------------------------------- */

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '90%!important'
  },
  inputSection: {
    display: 'flex',
    flexDirection: 'column',
    width: '60%'
  },
  inputRow: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 20
  },
  inputFieldName: {
    flex: 1
  },
  inputBox: {
    flex: 2,
    '& > div': {
      height: 32,
      width: 220
    }
  },
  airFlowTypeSelect: {
    height: 32,
    width: 220,
    flex: 2
  },
  tableCell: {
    width: '50%!important'
  }
}));

const CustomSwitch = withStyles((theme) => ({
  root: {
    width: '42px!important',
    height: '26px!important',
    padding: '0!important',
    margin: `${theme.spacing(1)}!important`,
  },
  switchBase: {
    padding: '1px!important',
    '&$checked': {
      transform: 'translateX(16px)!important',
      color: `#52d869!important`,
      '& + $track': {
        backgroundColor: '#52d869!important',
        opacity: '1!important',
        border: 'none!important',
      },
    },
    '&$focusVisible $thumb': {
      color: '#52d869!important',
      border: '6px solid #fff!important',
    },
  },
  thumb: {
    width: '23px!important',
    height: '23px!important',
    border: '1px solid black!important'
  },
  track: {
    borderRadius: '13px!important',
    border: `1px solid ${theme.palette.grey[400]}!important`,
    backgroundColor: `gray!important`,
    opacity: '1!important',
    transition: `${theme.transitions.create(['background-color', 'border'])}!important`,
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});

export default function FlowRates() {
  const classes = useStyles();
  const { submitCooling } = useCooling()
  const { idToken } = useAuth();
  const { getCoolingImageUrl } = useImage()
  const { coolingSubmitError } = useError()
  const { Cooling } = FORM_DATA;
  const {newMachineID, loadedMachine } = useSelector(state => state.machine);
  console.log(newMachineID)
  const {newHousingId,loadedHousing}=useSelector(state => state.machine);
  const {newRotorId,loadedRotor}=useSelector(state => state.machine);
  //  useStates
  const [coolingType, setCoolingType] = useState('')
  const [coolingData, setCoolingData] = useState(null);
  const [housingType, setHousingType] = useState(null);
  const [rotorType, setRotorType] = useState(null);
  const { machines, machineLoading } = useSelector(state => state.machine);
  const [waterJacketType,setwaterJacketType]=useState(null);
  const [airFlowType, setAirFlowType] = useState('');
  const [waterChecked, setWaterChecked] = useState(false);

  useEffect(() => {
    if (loadedMachine && loadedMachine.cooling) {
      const loadedCooling = loadedMachine.cooling;
      if (loadedCooling.type !== 'housing') {
        setCoolingType(loadedCooling.type);
        setCoolingData(loadedCooling.data);
        getCoolingImageUrl(loadedCooling.type);
      }
    }
  }, [loadedMachine]);

  const handleWaterJacketType = (value) => {
    setwaterJacketType(value)
  };

  const getHousingData = async () => {
    try {
      if (newMachineID) {
        const response = await apiClient(idToken).get(`/machine/dimensions/${newHousingId}/getHousingType`);
        setHousingType(response.data);
        console.log(housingType, response)
      }
      if (loadedMachine) {
        const response = await apiClient(idToken).get(`/machine/dimensions/${loadedMachine.housing.id}/getHousingType`);
        setHousingType(response.data);
        console.log(housingType, response)
      }
    } catch (error) {
      console.log(error)
    }
  };
  // {machines &&
  //     machines.map((machineItemKey,index)=>(
  //         setRotorType(machineItemKey.rotor.type)
  //     ))
  // }
  // {machines &&
  // machines.map((machineItemKey,index)=>(
  //     setHousingType(machineItemKey.housing.type)
  // ))
  // }

  const getRotorData = async () => {
    try {
      if (newMachineID) {
        const response = await apiClient(idToken).get(`/machine/dimensions/${newRotorId}/get_Rotor_Type`);
        setRotorType(response.data);
        console.log(rotorType, response)
      }
      if (loadedMachine) {
        const response = await apiClient(idToken).get(`/machine/dimensions/${loadedMachine.rotor.id}/get_Rotor_Type`);
        setRotorType(response.data)
        console.log(rotorType, response)
      }
    } catch (error) {
      console.log(error)
    }
  };

  const handleCoolingType = useCallback((value) => {
    setCoolingType(value);
    setCoolingData(Cooling[value]);
    getCoolingImageUrl(value);
  }, [Cooling]);

  const handleCoolingData = (key, value) => {
    setCoolingData({
      ...coolingData,
      [key]: value,
    })
  };

  const handleSubmit = async () => {
    const cloneData = { ...coolingData };
    delete cloneData.Type;

    const reqData = {
      type: coolingData.Type,
      data: {
        ...cloneData,
      },
    };

    try {
      const response = await apiClient(idToken).post('/machine/cooling/', reqData);
      if (response.data && response.data['id']) {
        const request = {
          cooling: response.data['id']
        };
        const res = await apiClient(idToken).patch(`/machine/dimensions/${newMachineID}/`, request);
        console.log('Cooling  is updated with new Cooling Id', res.data,newMachineID)

      }
    } catch (e) {

    }
    // submitCooling(reqData)
  };

  const onChangeAirFlowType = (event) => {
    handleCoolingType(event.target.value);
    getHousingData();
    getRotorData();
    setAirFlowType(event.target.value);
    setWaterChecked(false);
  };

  const onRenderThroughFlowTables = (housingType, rotorType) => {
    if (housingType === 'Frame' && rotorType === 'LamHole') {
      return (
        Object.keys(FORM_DATA.Frame_Hole).map((frameItemKey, index) => {
          return (
            <TableRow key={index}>
              <TableCell>
                {frameItemKey}
              </TableCell>
              <TableCell>
                <TextField
                  type="number"
                  inputProps={{ min: 0 }}
                  size="small"
                  className={classes.inputBox}
                />
              </TableCell>
            </TableRow>
          )
        })
      )
    }

    if (housingType === 'FrameBar' && rotorType === 'LamSlot') {
      return (
        Object.keys(FORM_DATA.FrameBar_Slot).map((rotorItemKey, index) => {
          return(
            <TableRow key={index}>
              <TableCell>
                {rotorItemKey}
              </TableCell>
              <TableCell>
                <TextField
                  type="number"
                  inputProps={{ min: 0 }}
                  size="small"
                  className={classes.inputBox}
                />
              </TableCell>
            </TableRow>
          )
        })
      )
    }

    if (housingType === 'FrameBar'&& rotorType === 'LamHole') {
      return (
        Object.keys(FORM_DATA.FrameBar_Hole).map((rotorItemKey, index) => {
          return (
            <TableRow key={index}>
              <TableCell>
                {rotorItemKey}
              </TableCell>
              <TableCell sx={{ py: 1 }}>
                <TextField
                  type="number"
                  inputProps={{ min: 0 }}
                  size="small"
                  className={classes.inputBox}
                />
              </TableCell>
            </TableRow>
          )
        })
      )
    }

    if (housingType === 'Frame' && rotorType === 'LamSlot') {
      return (
        Object.keys(FORM_DATA.Frame_Slot).map((frameItemKey, index) => {
          return(
            <TableRow key={index}>
              <TableCell>
                {frameItemKey}
              </TableCell>
              <TableCell sx={{ py: 1 }}>
                <TextField
                  type="number"
                  inputProps={{ min: 0 }}
                  size="small"
                  className={classes.inputBox}
                />
              </TableCell>
            </TableRow>
          )
        })
      )
    }
  };

  const onWaterJacketToggle = (event) => {
    setWaterChecked(event.target.checked);
  };

  return (
    <Stack spacing={2}>
      <Container className={classes.container}>
        <TableContainer component={Card} style={{ marginTop: 20, width: '60%' }}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className={classes.tableCell}>Air Flow Type</TableCell>
                <TableCell className={classes.tableCell}>
                  <FormControl className={classes.airFlowTypeSelect}>
                    <Select
                      className={clsx(classes.airFlowTypeSelect, classes.inputBox)}
                      value={airFlowType}
                      onChange={onChangeAirFlowType}
                    >
                      {Object.keys(FORM_DATA.Cooling).map((coolingKey,index) => (
                        <MenuItem key={index} value={coolingKey}>
                          {FORM_DATA.Cooling[coolingKey]['DisplayName']}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </TableCell>
              </TableRow>
              {coolingType && (
                <>
                  <TableRow>
                    <TableCell className={classes.tableCell}>Ambient Temp</TableCell>
                    <TableCell className={classes.tableCell}>
                      <TextField
                        type="number"
                        className={classes.inputBox}
                        inputProps={{ min: 0 }}
                        size="small"
                        // value={coolingData[coolingItemKey] || ''}
                        // onChange={(e) =>
                        //   handleCoolingData(
                        //     coolingItemKey,
                        //     e.target.value,
                        //   )
                        // }
                      />
                    </TableCell>
                  </TableRow>

                  <TableRow className={classes.inputRow}>
                    <TableCell className={classes.tableCell}>Altitude</TableCell>
                    <TableCell className={classes.tableCell}>
                      <TextField
                        type="number"
                        className={classes.inputBox}
                        inputProps={{ min: 0 }}
                        size="small"
                        // value={coolingData[coolingItemKey] || ''}
                        // onChange={(e) =>
                        //   handleCoolingData(
                        //     coolingItemKey,
                        //     e.target.value,
                        //   )
                        // }
                      />
                    </TableCell>
                  </TableRow>
                  {coolingType === 'ThroughFlow' && (
                    <TableRow className={classes.inputRow}>
                      <TableCell className={classes.tableCell}>Flow Rate</TableCell>
                      <TableCell className={classes.tableCell}>
                        <TextField
                          type="number"
                          className={classes.inputBox}
                          inputProps={{ min: 0 }}
                          size="small"
                          // value={coolingData[coolingItemKey] || ''}
                          // onChange={(e) =>
                          //   handleCoolingData(
                          //     coolingItemKey,
                          //     e.target.value,
                          //   )
                          // }
                        />
                      </TableCell>
                    </TableRow>
                  )}
                </>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {coolingData && (
          (coolingType === 'ThroughFlow' && housingType && rotorType) && (
            <TableContainer component={Card} style={{ marginTop: 20, width: '60%' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ py: 1, width: '50%' }}>Passage</TableCell>
                    <TableCell sx={{ py: 1, width: '50%' }}>Flow Rate</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {onRenderThroughFlowTables(housingType, rotorType)}
                </TableBody>
              </Table>
            </TableContainer>
          )
        )}
        <Divider style={{ margin: '40px 0' }} />
        {coolingType && (
          <div>
            <FormControlLabel
              label="Water Jacket"
              labelPlacement="start"
              control={<CustomSwitch checked={waterChecked} onChange={onWaterJacketToggle} name="WaterJacket" />}
            />
            {waterChecked && (
              <TableContainer component={Card} style={{ marginTop: 20, width: '60%' }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ py: 1, width: '50%' }}>Passage</TableCell>
                      <TableCell sx={{ py: 1, width: '50%' }}>Flow Rate</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Object.keys(FORM_DATA.WaterJacket.WithWaterJacket).map((wjKey, index) => {
                      return (
                        <TableRow key={index}>
                          <TableCell>
                            {wjKey}
                          </TableCell>
                          <TableCell>
                            <TextField
                              type="number"
                              inputProps={{ min: 0 }}
                              size="small"
                              className={classes.inputBox}
                            />
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </div>
        )}

        {/*<TableContainer component={Card}>*/}
        {/*  <Table>*/}
        {/*    <TableHead>*/}
        {/*      <TableRow>*/}
        {/*        <TableCell sx={{ py: 1, width: '60%' }}>Parameter</TableCell>*/}
        {/*        <TableCell sx={{ py: 1, width: '40%' }}>Value</TableCell>*/}
        {/*      </TableRow>*/}
        {/*    </TableHead>*/}

        {/*    <TableBody>*/}
        {/*      {coolingData &&*/}
        {/*      Object.keys(coolingData).map((coolingItemKey,index) => {*/}
        {/*        if (coolingItemKey !== 'Type' && coolingItemKey !== 'DisplayName') {*/}
        {/*          if (coolingItemKey === 'WaterJacket') {*/}
        {/*            return (*/}
        {/*              <TableRow key={coolingItemKey}>*/}
        {/*                <TableCell sx={{ py: 1 }}>*/}
        {/*                  {coolingItemKey}*/}
        {/*                </TableCell>*/}
        {/*                <TableCell sx={{ py: 1 }}>*/}
        {/*                  <TextField*/}
        {/*                    select*/}
        {/*                    variant="outlined"*/}
        {/*                    name="WaterJacket"*/}
        {/*                    value={coolingData[coolingItemKey]}*/}
        {/*                    onChange={(e) =>*/}
        {/*                    {( handleCoolingData(coolingItemKey, e.target.value,));handleWaterJacketType(e.target.value);}*/}
        {/*                    }*/}
        {/*                    size="small"*/}
        {/*                  >*/}
        {/*                    {Object.keys(FORM_DATA.WaterJacket).map(*/}
        {/*                      (passageItemkey) => (*/}
        {/*                        <MenuItem key={passageItemkey} value={passageItemkey}>*/}
        {/*                          {passageItemkey}*/}
        {/*                        </MenuItem>*/}
        {/*                      ),*/}
        {/*                    )}*/}
        {/*                  </TextField>*/}
        {/*                </TableCell>*/}
        {/*                <TableRow>*/}
        {/*                  <Table>*/}
        {/*                    <TableHead>*/}
        {/*                      <TableRow>*/}
        {/*                        <TableCell sx={{ py: 1, width: '60%' }}>WaterJacket Specifics</TableCell>*/}
        {/*                        <TableCell sx={{ py: 1, width: '40%' }}>Value</TableCell>*/}
        {/*                      </TableRow>*/}
        {/*                    </TableHead>*/}
        {/*                    {waterJacketType &&*/}
        {/*                    Object.keys(FORM_DATA.WaterJacket.WithWaterJacket).map((wjKey,index)=>{*/}
        {/*                      if (waterJacketType==='WithWaterJacket'){*/}
        {/*                        return(*/}
        {/*                          <TableBody>*/}
        {/*                            <TableRow key={wjKey}>*/}
        {/*                              <TableCell>*/}
        {/*                                {wjKey}*/}
        {/*                              </TableCell>*/}
        {/*                              <TableCell sx={{ py: 1 }}>*/}
        {/*                                <TextField*/}
        {/*                                  type="number"*/}
        {/*                                  inputProps={{ min: 0 }}*/}
        {/*                                  size="small"*/}
        {/*                                />*/}
        {/*                              </TableCell>*/}
        {/*                            </TableRow>*/}
        {/*                          </TableBody>*/}
        {/*                        )*/}
        {/*                      }*/}
        {/*                    })*/}

        {/*                    }*/}
        {/*                  </Table>*/}
        {/*                </TableRow>*/}
        {/*              </TableRow>*/}
        {/*            )*/}
        {/*          }*/}
        {/*        } else {*/}
        {/*          return null*/}
        {/*        }*/}
        {/*      })}*/}
        {/*    </TableBody>*/}

        {/*  </Table>*/}
        {/*</TableContainer>*/}

        <Button
          variant="contained"
          disabled={!coolingData}
          style={{ marginTop: 20 }}
          // onClick={handleSubmit}
          color={coolingSubmitError ? 'error' : 'primary'}
          size="large"
        >
          Submit
        </Button>


      </Container>
    </Stack>
  )
}