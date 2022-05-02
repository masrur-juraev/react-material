import Dialog from "@material-ui/core/Dialog";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {createStyles, Typography} from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import React, {useCallback, useState} from "react";
import { withStyles, makeStyles } from '@mui/styles';
import {apiClient} from "../../../utils/api";
import {newMachineCreated} from "../../../store/actions";
import {useDispatch} from "react-redux";
import { useNavigate } from 'react-router-dom';
import useAuth from "../../../hooks/useAuth";

const styles = () =>
  createStyles({
    root: {
      margin: 0,
      padding: 16,
      paddingTop: 26
    },
    closeButton: {
      position: 'absolute!important',
      right: '8px!important',
      background: 'transparent!important'
    },
    closeBtnIcon: {
      color: '#212D4080',
      width: 24,
      height: 24
    },
    header: {
      color: '#212D40',
      fontSize: 24,
      paddingLeft: 17,
      paddingBottom: 7,
      display: 'flex',
      alignItems: 'center'
    }
  });

const DialogTitle = withStyles(styles)((props) => {
  const {children, classes, onClose, ...other} = props;
  return (
    <MuiDialogTitle className={classes.root} {...other}>
      <div className={classes.header}>
        {children}
        {onClose ? (
          <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
            <CloseIcon classes={{ root: classes.closeBtnIcon }}/>
          </IconButton>
        ) : null}
      </div>
    </MuiDialogTitle>
  );
});

const useStyles = makeStyles(() => ({
  root: {},
  paper: {
    borderRadius: '24px!important'
  },
  createBtn: {
    width: 91,
    height: 37,
    borderRadius: 6,
    textTransform: 'none',
    fontSize: 14
  },
  cancelBtn: {
    width: 91,
    height: 37,
    borderRadius: 6,
    textTransform: 'none',
    fontSize: 14
  },
  textField: {
    "& .MuiOutlinedInput-inputMarginDense": {
      margin: "0!important",
      border: '1px solid #697683',
      padding: 4,
      borderRadius: 3,
      paddingLeft: 6,
      fontSize: 14,
    }
  },
  label: {
    "&$focusedLabel": {
      fontSize: 12,
      color: "#606B76"
    },
    "&$erroredLabel": {
      color: "#707070"
    }
  },
  focusedLabel: {},
  erroredLabel: {},
  underline: {
    width: '100%',
    fontSize: 14
  },
  error: {}
}));

const CreateMachine = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { open, onClose, isNew, selectedMachine } = props;
  const { idToken } = useAuth();
  const [machineName, setMachineName] = useState('');

  const init = () => {
    setMachineName('');
  };

  const onChangeMachineName = useCallback((e) => {
    const value = e.target.value;
    if (value === ' ' && machineName.length === 0) {
      e.preventDefault();
    } else {
      setMachineName(value);
    }
  }, [machineName]);

  const onCloseDialog = () => {
    init();
    onClose();
  };

  const onCreateMachine = useCallback(async () => {
    isNew ? handleCreateNewMachine() : handleDuplicateMachine();
  }, [isNew, machineName]);

  const handleCreateNewMachine = useCallback(async () => {
    try {
      const stator_data = {type: null, data: null};
      const rotor_data = {type: null, data: null};
      const housing_data = {type: null, data: null};
      const losses_data = {type:null,data:null};
      const responseStator = await apiClient(idToken).post('/machine/stator/', stator_data);
      const responseRotor = await apiClient(idToken).post('/machine/rotor/', rotor_data);
      const responseHousing = await apiClient(idToken).post('/machine/housing/', housing_data);
      const responseLosses = await apiClient(idToken).post('/machine/loss/', losses_data);

      const request = {
        name: machineName,
        stator: responseStator.data.id,
        rotor: responseRotor.data.id,
        housing: responseHousing.data.id,
        loss: responseLosses.data.id
      };
      const responseMachine = await apiClient(idToken).post('/machine/dimensions/', request);

      dispatch(newMachineCreated(responseMachine.data));
      onClose();
      const url = '/dashboard/dimensions/';
      navigate(url);
    } catch (e) {

    }
  }, [machineName, idToken]);

  const handleDuplicateMachine = useCallback(async () => {
    const stator = await onCreateNewStator(selectedMachine);
    const rotor = await onCreateNewRotor(selectedMachine);
    const housing = await onCreateNewHousing(selectedMachine);
    const losses=await onCreateNewLosses(selectedMachine);
    const request = {
      name: machineName,
      stator: stator.id,
      rotor: rotor.id,
      housing: housing.id
    };
    await apiClient(idToken).post('/machine/dimensions/', request);
    onClose();
  }, [selectedMachine, machineName, idToken]);

  const onCreateNewRows = async (url, payload) => {
    try {
      const response = await apiClient(idToken).post(url, payload);
      return response.data;
    } catch (e) {
      return null
    }
  };

  const onCreateNewStator = async (selectedMachine) => {
    const statorReq = {
      type: selectedMachine.stator.type,
      data: selectedMachine.stator.data
    };
    const newStator = await onCreateNewRows('/machine/stator/', statorReq);
    if (newStator) {
      let newStatorSlot, newStatorConductor = null;
      if (selectedMachine.stator.slot) { // Create Slot of Stator
        const statorSlotReq = {
          type: selectedMachine.stator.slot.type,
          data: selectedMachine.stator.slot.data
        };
        newStatorSlot = await onCreateNewRows('/machine/slot/', statorSlotReq);
      }

      if (selectedMachine.stator.conductor) { // Create Conductor of Stator
        const statorConductorReq = {
          type: selectedMachine.stator.conductor.type,
          data: selectedMachine.stator.conductor.data
        };
        newStatorConductor = await onCreateNewRows('/machine/conductor/', statorConductorReq);
      }

      if (newStatorSlot) {
        await apiClient(idToken).patch(`/machine/stator/${newStator.id}/`, {slot: newStatorSlot.id});
      }
      if (newStatorConductor) {
        await apiClient(idToken).patch(`/machine/stator/${newStator.id}/`, {conductor: newStatorConductor.id});
      }
    }
    return newStator;
  };

  const onCreateNewRotor = async (selectedMachine) => {
    const rotorReq = {
      type: selectedMachine.rotor.type,
      data: selectedMachine.rotor.data
    };
    const newRotor = await onCreateNewRows('/machine/rotor/', rotorReq);
    if (newRotor) {
      let newRotorSlot, newRotorConductor, newRotorHole = null;
      if (selectedMachine.rotor.slot) { // Create Slot of Rotor
        const rotorSlotReq = {
          type: selectedMachine.rotor.slot.type,
          data: selectedMachine.rotor.slot.data
        };
        newRotorSlot = await onCreateNewRows('/machine/slot/', rotorSlotReq);
      }

      if (selectedMachine.rotor.conductor) { // Create Conductor of Rotor
        const rotorConductorReq = {
          type: selectedMachine.rotor.conductor.type,
          data: selectedMachine.rotor.conductor.data
        };
        newRotorConductor = await onCreateNewRows('/machine/conductor/', rotorConductorReq);
      }

      if (selectedMachine.rotor.hole) { // Create Hole of Rotor
        const rotorHoleReq = {
          type: selectedMachine.rotor.hole.type,
          data: selectedMachine.rotor.hole.data
        };
        newRotorHole = await onCreateNewRows('/machine/hole/', rotorHoleReq);
      }

      if (newRotorSlot) {
        await apiClient(idToken).patch(`/machine/rotor/${newRotor.id}/`, {slot: newRotorSlot.id});
      }
      if (newRotorConductor) {
        await apiClient(idToken).patch(`/machine/rotor/${newRotor.id}/`, {conductor: newRotorConductor.id});
      }
      if (newRotorHole) {
        await apiClient(idToken).patch(`/machine/rotor/${newRotor.id}/`, {hole: newRotorHole.id});
      }
    }
    return newRotor
  };

  const onCreateNewHousing = async (selectedMachine) => {
    const housingReq = {
      type: selectedMachine.housing.type,
      data: selectedMachine.housing.data
    };
    return await onCreateNewRows('/machine/housing/', housingReq);
  };
  const onCreateNewLosses = async (selectedMachine) => {
    const lossesReq = {
      type: selectedMachine.losses.type,
      data: selectedMachine.losses.data
    };
    return await onCreateNewRows('/machine/loss/', lossesReq);
  };

  return (
    <Dialog
      disableEscapeKeyDown
      fullWidth={true}
      maxWidth={'sm'}
      open={open}
      classes={{
        root: classes.root,
        paper: classes.paper
      }}
    >
      <div>
        <DialogTitle onClose={onCloseDialog}>
          Create a New Machine List
        </DialogTitle>
        <Divider/>

        <Box m={4} pl={1} pr={1}>
          <Typography variant="h6" paragraph>
            Please enter machine name.
          </Typography>
          <TextField
            InputLabelProps={{
              classes: {
                root: classes.label,
                focused: classes.focusedLabel,
                error: classes.erroredLabel
              },
            }}
            InputProps={{
              classes: {
                root: classes.underline,
                error: classes.error
              }
            }}
            value={machineName}
            fullWidth
            margin="normal"
            id="machine_name"
            label="Machine Name"
            name="machine_name"
            onChange={onChangeMachineName}
          />
        </Box>
        <Box mt={6} mb={3} mr={4} display='flex' justifyContent='flex-end'>
          <Button onClick={onCloseDialog} className={classes.cancelBtn}>
            Cancel
          </Button>
          &nbsp;&nbsp;&nbsp;
          <Button
            onClick={onCreateMachine}
            className={classes.createBtn}
            disabled={machineName.length === 0}
            style={machineName.length === 0 ? {backgroundColor: "#F0F0F0"} : {}}
          >
            Create
          </Button>
        </Box>
      </div>
    </Dialog>
  );
};

export default CreateMachine;