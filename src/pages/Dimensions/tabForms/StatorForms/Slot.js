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
  onGetStatorSlotImage,
  onSetStatorSlotData,
  onSetStatorSlotParam,
  onSetStatorSlotType
} from "../../../../store/actions/stator";
import useAuth from "../../../../hooks/useAuth";

/* ----------------------------------------------------------------- */

export default function Slot() {
  const dispatch = useDispatch();
  const { slotSubmitError } = useError();
  const { idToken } = useAuth();
  const { slot_stator } = FORM_DATA;
  const { newStatorId, loadedMachine } = useSelector(state => state.machine);
  const { statorSlotType, statorSlotData } = useSelector(state => state.stator);

  useEffect(() => {
    if (loadedMachine && loadedMachine.stator && loadedMachine.stator.slot) {
      const loadedSlot = loadedMachine.stator.slot;
      dispatch(onSetStatorSlotType(loadedSlot.type));
      dispatch(onSetStatorSlotData(loadedSlot.data));
      dispatch(onGetStatorSlotImage(loadedSlot.type));
    }
  }, [loadedMachine, dispatch]);

  const handleSlotType = useCallback((value) => {
    dispatch(onSetStatorSlotType(value));
    dispatch(onSetStatorSlotData(slot_stator[value]));
    dispatch(onGetStatorSlotImage(value));
  }, [dispatch, slot_stator]);

  const handleSlotData = (key, value) => {
    dispatch(onSetStatorSlotParam(key, value))
  };

  const handleSubmit = async () => {
    const cloneSlotData = { ...statorSlotData };
    delete cloneSlotData.Type;

    const reqData = {
      type: statorSlotType,
      data: {
        ...cloneSlotData
      }
    };
    try {
      const response = await apiClient(idToken).post('/machine/slot/', reqData);
      if (response.data && response.data['id']) {
        const request = {
          slot: response.data['id']
        };
        if (newStatorId || loadedMachine) {
          const statorId = newStatorId ? newStatorId : loadedMachine.stator.id;
          const res = await apiClient(idToken).patch(`/machine/stator/${statorId}/`, request);
          console.log('Stator is updated with new Slot Id', res.data)
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
        value={statorSlotType}
        onChange={(e) => handleSlotType(e.target.value)}
      >
        {Object.keys(FORM_DATA.slot_stator).map((slotItemKey, index) => (
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
            {statorSlotData &&
              Object.keys(statorSlotData).map((slotDataItemKey, index) => {
                if (slotDataItemKey !== 'Type') {
                  return (
                    <TableRow key={index}>
                      <TableCell sx={{ py: 1 }}>{slotDataItemKey}</TableCell>
                      <TableCell sx={{ py: 1 }}>
                        <TextField
                          type="number"
                          inputProps={{ min: 0 }}
                          size="small"
                          value={statorSlotData[slotDataItemKey]}
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
        disabled={!statorSlotData}
        onClick={handleSubmit}
        color={slotSubmitError ? 'error' : 'primary'}
      >
        Submit
      </Button>
    </Stack>
  )
}
