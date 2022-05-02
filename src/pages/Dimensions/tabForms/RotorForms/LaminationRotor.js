import React, {useEffect, useCallback} from 'react'
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
  onSetRotorConductorImageURL,
  onSetRotorHoleImageURL,
  onSetRotorLaminationData,
  onSetRotorLaminationParam,
  onSetRotorLaminationType, onSetRotorMainImageURL, onSetRotorSlotImageURL
} from "../../../../store/actions/rotor";
import useAuth from "../../../../hooks/useAuth";

/* ----------------------------------------------------------------- */

export default function LaminationRotor(props) {
  const dispatch = useDispatch();
  const { idToken } = useAuth();
  const { laminationSubmitError } = useError();
  const { lamination_rotor } = FORM_DATA;
  const { newRotorId, loadedMachine } = useSelector(state => state.machine);
  const { rotorLaminationType, rotorLaminationData } = useSelector(state => state.rotor);

  useEffect(() => {
    if (loadedMachine && loadedMachine.rotor) {
      const loadedRotor = loadedMachine.rotor;
      if (loadedRotor.type !== 'rotor') {
        dispatch(onSetRotorLaminationType(loadedRotor.type));
        dispatch(onSetRotorLaminationData(loadedRotor.data));
      }
    }
  }, [loadedMachine, dispatch]);

  const handleLaminationType = useCallback((value) => {
    dispatch(onSetRotorHoleImageURL(''));
    dispatch(onSetRotorSlotImageURL(''));
    dispatch(onSetRotorConductorImageURL(''));
    dispatch(onSetRotorMainImageURL(''));

    dispatch(onSetRotorLaminationType(value));
    dispatch(onSetRotorLaminationData(lamination_rotor[value]));
  }, [lamination_rotor]);

  const handleLaminationData = (key, value) => {
    dispatch(onSetRotorLaminationParam(key, value));
  };

  const handleSubmit = async () => {
    const cloneLaminationData = {...rotorLaminationData};
    delete cloneLaminationData.Type;

    const reqData = {
      type: rotorLaminationType,
      data: {
        ...cloneLaminationData
      },
    };
    if (newRotorId || loadedMachine) {
      const rotorId = newRotorId ? newRotorId : loadedMachine.rotor.id;
      const res = await apiClient(idToken).patch(`/machine/rotor/${rotorId}/`, reqData);
      console.log('This is response from new saved ID - Rotor:', res.data);
    }
    // submitLaminationRotor(reqData)
  };

  return (
    <Stack spacing={2}>
      <TextField
        select
        name="laminationType"
        label="Lamination Type"
        variant="outlined"
        size="small"
        value={rotorLaminationType}
        onChange={(e) => handleLaminationType(e.target.value)}
      >
        {Object.keys(FORM_DATA.lamination_rotor).map((laminationItemKey, index) => (
          <MenuItem key={index} value={laminationItemKey}>
            {laminationItemKey}
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
            {rotorLaminationData &&
              Object.keys(rotorLaminationData).map(
                (laminationDataItemKey, index) => {
                  if (laminationDataItemKey !== 'Type') {
                    return (
                      <TableRow key={index}>
                        <TableCell sx={{ py: 1 }}>
                          {laminationDataItemKey}
                        </TableCell>
                        <TableCell sx={{ py: 1 }}>
                          {laminationDataItemKey === 'Material' ? (
                            <TextField
                              select
                              variant="outlined"
                              value={rotorLaminationData[laminationDataItemKey]}
                              onChange={(e) =>
                                handleLaminationData(
                                  laminationDataItemKey,
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
                          ) : (
                            <TextField
                              type="number"
                              inputProps={{ min: 0 }}
                              size="small"
                              value={rotorLaminationData[laminationDataItemKey]}
                              onChange={(e) =>
                                handleLaminationData(
                                  laminationDataItemKey,
                                  e.target.value,
                                )
                              }
                            />
                          )}
                        </TableCell>
                      </TableRow>
                    )
                  } else {
                    return null
                  }
                },
              )}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="contained"
        disabled={!rotorLaminationData}
        onClick={handleSubmit}
        color={laminationSubmitError ? 'error' : 'primary'}
      >
        Submit
      </Button>
    </Stack>
  )
}
