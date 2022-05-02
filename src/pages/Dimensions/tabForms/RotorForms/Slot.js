import React, {useCallback, useEffect} from 'react'
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
} from '@material-ui/core'
import { FORM_DATA } from 'src/utils/constants'
import useError from 'src/hooks/useError'
import {apiClient} from "../../../../utils/api";
import {useDispatch, useSelector} from "react-redux";
import {
  onGetRotorSlotImage,
  onSetRotorSlotData,
  onSetRotorSlotParam,
  onSetRotorSlotType
} from "../../../../store/actions/rotor";
import useAuth from "../../../../hooks/useAuth";

/* ----------------------------------------------------------------- */

export default function Slot() {
  const dispatch = useDispatch();
  const { idToken } = useAuth();
  const { slotSubmitError } = useError();
  const { slot_rotor } = FORM_DATA;
  const { newRotorId, loadedMachine } = useSelector(state => state.machine);
  const { rotorSlotType, rotorSlotData } = useSelector(state => state.rotor);

  useEffect(() => {
    if (loadedMachine && loadedMachine.rotor && loadedMachine.rotor.slot) {
      const loadedSlot = loadedMachine.rotor.slot;
      dispatch(onSetRotorSlotType(loadedSlot.type));
      dispatch(onSetRotorSlotData(loadedSlot.data));
      dispatch(onGetRotorSlotImage(loadedSlot.type));
    }
  }, [loadedMachine]);

  const handleSlotType = useCallback((value) => {
    dispatch(onSetRotorSlotType(value));
    dispatch(onSetRotorSlotData(slot_rotor[value]));
    dispatch(onGetRotorSlotImage(value));
  }, [slot_rotor]);

  const handleSlotData = (key, value) => {
    dispatch(onSetRotorSlotParam(key, value));
  };

  const handleSubmit = async () => {
    const cloneSlotData = { ...rotorSlotData };
    delete cloneSlotData.Type;

    const reqData = {
      type: rotorSlotType,
      data: {
        ...cloneSlotData,
      },
    };
    try {
      const response = await apiClient(idToken).post('/machine/slot/', reqData);
      if (response.data && response.data['id']) {
        const request = {
          slot: response.data['id']
        };
        if (newRotorId || loadedMachine) {
          const rotorId = newRotorId ? newRotorId : loadedMachine.rotor.id;
          const res = await apiClient(idToken).patch(`/machine/rotor/${rotorId}/`, request);
          console.log('Rotor is updated with new Slot Id', res.data)
        }
      }
    } catch (e) {

    }
    // submitSlot(reqData)
  };

  return (
    <Stack spacing={2}>
      <TextField
        select
        name="slotType"
        label="Slot Type"
        variant="outlined"
        size="small"
        value={rotorSlotType}
        onChange={(e) => handleSlotType(e.target.value)}
      >
        {Object.keys(FORM_DATA.slot_rotor).map((slotItemKey, index) => (
          <MenuItem key={index} value={slotItemKey}>
            {slotItemKey}
          </MenuItem>
        ))}
      </TextField>

      <TableContainer component={Card}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ py: 1, width: '60%' }}>Parameter</TableCell>
              <TableCell sx={{ py: 1, width: '40%' }}>Value</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rotorSlotData &&
              Object.keys(rotorSlotData).map((slotDataItemKey, index) => {
                if (slotDataItemKey !== 'Type') {
                  return (
                    <TableRow key={index}>
                      <TableCell sx={{ py: 1 }}>{slotDataItemKey}</TableCell>
                      <TableCell sx={{ py: 1 }}>
                        <TextField
                          type="number"
                          inputProps={{ min: 0 }}
                          size="small"
                          value={rotorSlotData[slotDataItemKey]}
                          onChange={(e) =>
                            handleSlotData(slotDataItemKey, e.target.value)
                          }
                        />
                      </TableCell>
                    </TableRow>
                  )
                } else {
                  return null
                }
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="contained"
        disabled={!rotorSlotData}
        onClick={handleSubmit}
        color={slotSubmitError ? 'error' : 'primary'}
      >
        Submit
      </Button>
    </Stack>
  )
}
