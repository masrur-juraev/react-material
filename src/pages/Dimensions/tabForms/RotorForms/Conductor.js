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
  onGetRotorConductorImage,
  onSetRotorConductorData,
  onSetRotorConductorParam,
  onSetRotorConductorType
} from "../../../../store/actions/rotor";
import useAuth from "../../../../hooks/useAuth";

/* ----------------------------------------------------------------- */

export default function Conductor() {
  const dispatch = useDispatch();
  const { idToken } = useAuth();
  const { conductorSubmitError } = useError();
  const { conductor } = FORM_DATA;
  const { newRotorId, loadedMachine } = useSelector(state => state.machine);
  const { rotorConductorType, rotorConductorData } = useSelector(state => state.rotor);

  useEffect(() => {
    if (loadedMachine && loadedMachine.rotor && loadedMachine.rotor.conductor) {
      const loadedConductor = loadedMachine.rotor.conductor;
      dispatch(onSetRotorConductorType(loadedConductor.type));
      dispatch(onSetRotorConductorData(loadedConductor.data));
      dispatch(onGetRotorConductorImage(loadedConductor.type));
    }
  }, [loadedMachine, dispatch]);

  const handleConductorType = useCallback((value) => {
    dispatch(onSetRotorConductorType(value));
    dispatch(onSetRotorConductorData(conductor[value]));
    dispatch(onGetRotorConductorImage(value));
  }, [conductor]);

  const handleConductorData = (key, value) => {
    dispatch(onSetRotorConductorParam(key, value));
  };

  const handleSubmit = async () => {
    const cloneData = { ...rotorConductorData };
    delete cloneData.Type;

    const reqData = {
      type: rotorConductorType,
      data: {
        ...cloneData,
      },
    };

    try {
      const response = await apiClient(idToken).post('/machine/conductor/', reqData);
      if (response.data && response.data['id']) {
        const request = {
          conductor: response.data['id']
        };
        if (newRotorId || loadedMachine) {
          const rotorId = newRotorId ? newRotorId : loadedMachine.rotor.id;
          const res = await apiClient(idToken).patch(`/machine/rotor/${rotorId}/`, request);
          console.log('Rotor is updated with new Conductor Id', res.data)
        }
      }
    } catch (e) {

    }
    // submitConductor(reqData)
  };

  return (
    <Stack spacing={2}>
      <TextField
        select
        name="conductorType"
        label="Conductor Type"
        variant="outlined"
        size="small"
        value={rotorConductorType}
        onChange={(e) => handleConductorType(e.target.value)}
      >
        {Object.keys(FORM_DATA.conductor).map((conductorItemKey, index) => (
          <MenuItem key={index} value={conductorItemKey}>
            {conductorItemKey}
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
            {rotorConductorData &&
              Object.keys(rotorConductorData).map((conductorDataItemKey, index) => {
                if (conductorDataItemKey !== 'Type') {
                  if (
                    conductorDataItemKey === 'ConductorMaterial' ||
                    conductorDataItemKey === 'InsulationMaterial'
                  ) {
                    return (
                      <TableRow key={index}>
                        <TableCell sx={{ py: 1 }}>
                          {conductorDataItemKey}
                        </TableCell>
                        <TableCell sx={{ py: 1 }}>
                          <TextField
                            select
                            variant="outlined"
                            name="conductorMaterial"
                            value={rotorConductorData[conductorDataItemKey]}
                            onChange={(e) =>
                              handleConductorData(
                                conductorDataItemKey,
                                e.target.value,
                              )
                            }
                            size="small"
                          >
                            {Object.keys(FORM_DATA.material).map(
                              (materialItemKey, index) => (
                                <MenuItem key={index} value={materialItemKey}>
                                  {materialItemKey}
                                </MenuItem>
                              ),
                            )}
                          </TextField>
                        </TableCell>
                      </TableRow>
                    )
                  } else {
                    return (
                      <TableRow key={conductorDataItemKey}>
                        <TableCell sx={{ py: 1 }}>
                          {conductorDataItemKey}
                        </TableCell>
                        <TableCell sx={{ py: 1 }}>
                          <TextField
                            type="number"
                            inputProps={{ min: 0 }}
                            size="small"
                            value={rotorConductorData[conductorDataItemKey] || ''}
                            onChange={(e) =>
                              handleConductorData(
                                conductorDataItemKey,
                                e.target.value,
                              )
                            }
                          />
                        </TableCell>
                      </TableRow>
                    )
                  }
                } else {
                  return null
                }
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="contained"
        disabled={!rotorConductorData}
        onClick={handleSubmit}
        color={conductorSubmitError ? 'error' : 'primary'}
      >
        Submit
      </Button>
    </Stack>
  )
}
