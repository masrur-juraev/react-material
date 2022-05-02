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
  onGetStatorConductorImage,
  onSetStatorConductorData,
  onSetStatorConductorParam,
  onSetStatorConductorType
} from "../../../../store/actions/stator";
import useAuth from "../../../../hooks/useAuth";

/* ----------------------------------------------------------------- */

export default function Conductor() {
  const dispatch = useDispatch();
  const { idToken } = useAuth();
  const { conductorSubmitError } = useError();
  const { conductor } = FORM_DATA;
  const { newStatorId, loadedMachine } = useSelector(state => state.machine);
  const { statorConductorType, statorConductorData } = useSelector(state => state.stator);

  useEffect(() => {
    if (loadedMachine && loadedMachine.stator && loadedMachine.stator.conductor) {
      const loadedConductor = loadedMachine.stator.conductor;
      dispatch(onSetStatorConductorType(loadedConductor.type));
      dispatch(onSetStatorConductorData(loadedConductor.data));
      dispatch(onGetStatorConductorImage(loadedConductor.type));
    }
  }, [loadedMachine, dispatch]);

  const handleConductorType = useCallback((value) => {
    dispatch(onSetStatorConductorType(value));
    dispatch(onSetStatorConductorData(conductor[value]));
    dispatch(onGetStatorConductorImage(value));
  }, [conductor]);

  const handleConductorData = (key, value) => {
    dispatch(onSetStatorConductorParam(key, value));
  };

  const handleSubmit = async () => {
    const cloneData = { ...statorConductorData }
    delete cloneData.Type;

    const reqData = {
      type: statorConductorType,
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
        if (newStatorId || loadedMachine) {
          const statorId = newStatorId ? newStatorId : loadedMachine.stator.id;
          const res = await apiClient(idToken).patch(`/machine/stator/${statorId}/`, request);
          console.log('Stator is updated with new Conductor Id', res.data)
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
        value={statorConductorType}
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
            {statorConductorData &&
              Object.keys(statorConductorData).map((conductorDataItemKey, index) => {
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
                            value={statorConductorData[conductorDataItemKey]}
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
                                <MenuItem
                                  key={index}
                                  value={materialItemKey}
                                >
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
                            value={statorConductorData[conductorDataItemKey] || ''}
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
        disabled={!statorConductorData}
        onClick={handleSubmit}
        color={conductorSubmitError ? 'error' : 'primary'}
      >
        Submit
      </Button>
    </Stack>
  )
}
