import React, {useCallback, useEffect, useState} from 'react'
// material
import {Button, Stack, Typography} from '@material-ui/core'
// hooks
// components
import Page from '../../../customComponents/Page'
import { PROJECT_NAME } from 'src/utils/constants'
import {useDispatch, useSelector} from "react-redux";
import {
  onDeleteSavedMachine,
  onEmptyNewIds,
  onGetMachines,
  onSaveMachine
} from "../../../store/actions/machine";
import { makeStyles } from '@mui/styles';
import CreateMachine from "./CreateMachine";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Divider from "@material-ui/core/Divider";
import {useNavigate} from "react-router";
import LoadingScreen from "../../../customComponents/LoadingScreen";
import useAuth from "../../../hooks/useAuth";
import {onInitStatorParams} from "../../../store/actions/stator";
import {onInitRotorParams} from "../../../store/actions/rotor";
import {onInitHousingParams} from "../../../store/actions/housing";
import {onInitLossParams} from "../../../store/actions/loss";

const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
  buttonDiv: {
    display: 'flex',
    flexDirection: 'column',
    width: 200
  },
  tableSection: {
    width: '65%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  linkWidth: {
    width: 'fit-content'
  },
  btn: {
    width: 170,
    marginBottom: '20px!important'
  },
  tableRowHover: {
    backgroundColor: '#F2F7FC !important'
  },
  tableRowSelected: {
    backgroundColor: '#dfebf7 !important'
  },
});

const headerCells = [
  { id: 'name', numeric: false, disablePadding: false, label: 'Name', color: 'primary' },
  { id: 'Slot_type', numeric: false, disablePadding: false, label: 'Slot Type', color: 'default' },
  { id: 'Conductor_Type', numeric: false, disablePadding: false, label: 'Conductor Type', color: 'default' },
  { id: 'rotor_type', numeric: false, disablePadding: false, label: 'Rotor Type', color: 'default' },
  { id: 'housing_type', numeric: false, disablePadding: false, label: 'Housing Type', color: 'default' },

];

const MachineOptions = () => {

  const classes = useStyles();
  const { idToken } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { machines, machineLoading } = useSelector(state => state.machine);
  const [openMachine, setOpenMachine] = useState(false);
  const [hoverMachineId, setHoverMachineId] = useState(0);
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [isNew, setIsNew] = useState(true);

  useEffect(() => {
    if (dispatch && idToken) {
      getInitData();
    }
  }, [dispatch, idToken]);
  const getInitData = useCallback(() => {
    dispatch(onEmptyNewIds());
    dispatch(onInitStatorParams());
    dispatch(onInitRotorParams());
    dispatch(onInitHousingParams());
    dispatch(onInitLossParams());
    dispatch(onSaveMachine(null));
    dispatch(onGetMachines(true, idToken));
  }, [dispatch, idToken]);

  const onStartCreateMachine = () => {
    setOpenMachine(true);
    setIsNew(true);
  };

  const onLoadMachine = useCallback(() => {
    dispatch(onSaveMachine(selectedMachine));
    const url = '/dashboard/dimensions/';
    navigate(url);
  }, [dispatch, selectedMachine, navigate]);

  const onCloseModal = useCallback(() => {
    setOpenMachine(false);
    !isNew && getInitData();
  }, [isNew]);

  const onSelectMachine = (machine) => {
    setSelectedMachine(machine);
  };

  const isMachineSelected = useCallback((machine) => {
    if (selectedMachine) {
      return selectedMachine.id === machine.id
    }
    return false;
  }, [selectedMachine]);

  const onDuplicateMachine = useCallback(() => {
    if (selectedMachine) {
      setOpenMachine(true);
      setIsNew(false);
    }
  }, [selectedMachine]);

  const onDeleteMachine = useCallback(() => {
    if (selectedMachine) {
      dispatch(onDeleteSavedMachine(selectedMachine.id, idToken, (res) => {
        if (res) {
          dispatch(onGetMachines(false, idToken));
        }
      }));
    }
  }, [selectedMachine, idToken]);

  return (

    <Page title={`Model Tree | ${PROJECT_NAME}`} sx={{height:'100%'}}>
      <Stack spacing={2}>
        {machineLoading && (
          <LoadingScreen
            sx={{
              top: 0,
              left: 0,
              width: 1,
              zIndex: 9999,
              position: 'fixed'
            }}
          />
        )}
        <div className={classes.root}>
          <div className={classes.buttonDiv}>
            <Button className={classes.btn} onClick={onStartCreateMachine} variant="contained">
              Create New Machine
            </Button>
            <Button className={classes.btn} disabled={!selectedMachine} onClick={onLoadMachine} variant="contained">
              Load Machine
            </Button>
            <Button className={classes.btn} disabled={!selectedMachine} onClick={onDuplicateMachine} variant="contained">
              Duplicate Machine
            </Button>
            <Button className={classes.btn} disabled={!selectedMachine} onClick={onDeleteMachine} variant="contained">
              Delete Machine
            </Button>
          </div>
          <Divider/>
          <div className={classes.tableSection}>
            <Typography variant="h5" component="h1" paragraph>
              Saved Machines
            </Typography>
            <TableContainer>
              <Table
                aria-labelledby="tableTitle"
                size="medium"
                aria-label="enhanced table"
              >
                <TableHead>
                  <TableRow>
                    {headerCells.map((header, index) => (
                      <TableCell
                        key={`header-${index}`}
                        align="left"
                        padding="normal"
                      >
                        <span>{header.label}</span>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {machines &&
                    machines.map((machine, index) => (
                    <TableRow
                      role="checkbox"
                      tabIndex={-1}
                      key={machine.id}
                      onMouseOver={() => setHoverMachineId(machine.id)}
                      onMouseLeave={() => setHoverMachineId(0)}
                      hover={machine.id === hoverMachineId}
                      onClick={() => onSelectMachine(machine)}
                      selected={isMachineSelected(machine)}
                      classes={{
                        hover: classes.tableRowHover,
                        selected: classes.tableRowSelected,
                      }}
                    >
                      <TableCell scope="row"><h3>{ machine.name }</h3></TableCell>
                      <TableCell scope="row">
                        {machine.stator && machine.stator.slot && machine.stator.slot.type && (
                          <h3>{machine.stator.slot.type}</h3>
                        )}
                      </TableCell>
                      <TableCell scope="row">
                        {machine.stator && machine.stator.conductor && machine.stator.conductor.type && (
                          <h3>{machine.stator.conductor.type}</h3>
                        )}
                      </TableCell>
                      <TableCell scope="row">
                        {(machine.rotor && machine.rotor.type) && (
                          <h3>{ machine.rotor.type }</h3>
                        )}
                      </TableCell>
                      <TableCell scope="row">
                        {(machine.housing && machine.housing.type) && (
                          <h3>{ machine.housing.type }</h3>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </Stack>
      <CreateMachine
        open={openMachine}
        onClose={onCloseModal}
        isNew={isNew}
        selectedMachine={selectedMachine}
      />
    </Page>

  )
};

export default MachineOptions;