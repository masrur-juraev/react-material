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
  onGetRotorHoleImage,
  onSetRotorHoleData,
  onSetRotorHoleParam,
  onSetRotorHoleType
} from "../../../../store/actions/rotor";
import useAuth from "../../../../hooks/useAuth";

/* ----------------------------------------------------------------- */

export default function Hole() {
  const dispatch = useDispatch();
  const { idToken } = useAuth();
  const { holeSubmitError } = useError();
  const { hole } = FORM_DATA;
  const { newRotorId, loadedMachine } = useSelector(state => state.machine);
  const { rotorHoleType, rotorHoleData } = useSelector(state => state.rotor);

  useEffect(() => {
    if (loadedMachine && loadedMachine.rotor && loadedMachine.rotor.hole) {
      const loadedHole = loadedMachine.rotor.hole;
      dispatch(onSetRotorHoleType(loadedHole.type));
      dispatch(onSetRotorHoleData(loadedMachine.data));
      dispatch(onGetRotorHoleImage(loadedHole.type));
    }
  }, [loadedMachine, dispatch]);

  const handleHoleType = useCallback((value) => {
    dispatch(onSetRotorHoleType(value));
    dispatch(onSetRotorHoleData(hole[value]));
    dispatch(onGetRotorHoleImage(value));
  }, [hole]);

  const handleHoleData = (key, value) => {
    dispatch(onSetRotorHoleParam(key, value))
  };

  const handleSubmit = async () => {
    const cloneHoleData = { ...rotorHoleData };
    delete cloneHoleData.Type;

    const reqData = {
      type: rotorHoleType,
      data: {
        ...cloneHoleData,
      },
    };

    try {
      const response = await apiClient(idToken).post('/machine/hole/', reqData);
      if (response.data && response.data['id']) {
        const request = {
          hole: response.data['id']
        };
        if (newRotorId || loadedMachine) {
          const rotorId = newRotorId ? newRotorId : loadedMachine.rotor.id;
          const res = await apiClient(idToken).patch(`/machine/rotor/${rotorId}/`, request);
          console.log('Rotor is updated with new Hole Id', res.data)
        }
      }
    } catch (e) {

    }
    // submitHole(reqData)
  };

  return (
    <Stack spacing={2}>
      <TextField
        select
        name="holeType"
        label="Hole Type"
        variant="outlined"
        size="small"
        value={rotorHoleType}
        onChange={(e) => handleHoleType(e.target.value)}
      >
        {Object.keys(FORM_DATA.hole).map((holeItemKey, index) => (
          <MenuItem key={index} value={holeItemKey}>
            {holeItemKey}
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
            {rotorHoleData &&
              Object.keys(rotorHoleData).map((holeDataItemKey, index) => {
                if (holeDataItemKey !== 'Type') {
                  if (holeDataItemKey === 'Material') {
                    return (
                      <TableRow key={index}>
                        <TableCell sx={{ py: 1 }}>{holeDataItemKey}</TableCell>
                        <TableCell sx={{ py: 1 }}>
                          <TextField
                            select
                            variant="outlined"
                            name="conductorMaterial"
                            value={rotorHoleData[holeDataItemKey]}
                            onChange={(e) =>
                              handleHoleData(holeDataItemKey, e.target.value)
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
                      <TableRow key={holeDataItemKey}>
                        <TableCell sx={{ py: 1 }}>{holeDataItemKey}</TableCell>
                        <TableCell sx={{ py: 1 }}>
                          <TextField
                            type="number"
                            inputProps={{ min: 0 }}
                            size="small"
                            value={rotorHoleData[holeDataItemKey] || ''}
                            onChange={(e) =>
                              handleHoleData(holeDataItemKey, e.target.value)
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
        disabled={!rotorHoleData}
        onClick={handleSubmit}
        color={holeSubmitError ? 'error' : 'primary'}
      >
        Submit
      </Button>
    </Stack>
  )
}
