import React, {useState, useEffect, useCallback} from 'react'
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
import {useDispatch, useSelector} from "react-redux";
import {apiClient} from "../../../../utils/api";
import {
  onSetStatorLaminationData,
  onSetStatorLaminationParam,
  onSetStatorLaminationType
} from "../../../../store/actions/stator";
import useAuth from "../../../../hooks/useAuth";

/* ----------------------------------------------------------------- */

export default function LaminationStator(props) {
  const { laminationSubmitError } = useError();
  const { idToken } = useAuth();
  const dispatch = useDispatch();
  const { newStatorId, loadedMachine } = useSelector(state => state.machine);
  const { statorLaminationType, statorLaminationData } = useSelector(state => state.stator);
  const { lamination_stator } = FORM_DATA;

  useEffect(() => {
    if (loadedMachine && loadedMachine.stator) {
      const loadedStator = loadedMachine.stator;
      if (loadedStator.type !== 'stator') {
        dispatch(onSetStatorLaminationType(loadedStator.type));
        dispatch(onSetStatorLaminationData(loadedStator.data));
      }
    }
  }, [loadedMachine, dispatch]);

  const handleLaminationType = useCallback((value) => {
    dispatch(onSetStatorLaminationType(value));
    dispatch(onSetStatorLaminationData(lamination_stator[value]));
  }, [dispatch, lamination_stator]);

  const handleLaminationData = (key, value) => {
    dispatch(onSetStatorLaminationParam(key, value));
  };

  const handleSubmit = async () => {
    const cloneLaminationData = {...statorLaminationData};
    delete cloneLaminationData.Type;

    const reqData = {
      type: statorLaminationType,
      data: {
        ...cloneLaminationData
      },
    };
    if (newStatorId || loadedMachine) {
      const statorId = newStatorId ? newStatorId : loadedMachine.stator.id;
      const res = await apiClient(idToken).patch(`/machine/stator/${statorId}/`, reqData);
      console.log('This is response from new saved ID - Stator:', res.data);
    }
    // submitLaminationStator(reqData)
  };

  return (
    <Stack spacing={2}>
      <TextField
        select
        name="laminationType"
        label="Lamination Type"
        variant="outlined"
        size="small"
        value={statorLaminationType}
        onChange={(e) => handleLaminationType(e.target.value)}
      >
        {Object.keys(FORM_DATA.lamination_stator).map((laminationItemKey, index) => (
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
            {statorLaminationData &&
              Object.keys(statorLaminationData).map(
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
                              value={statorLaminationData[laminationDataItemKey]}
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
                              value={statorLaminationData[laminationDataItemKey]}
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
        disabled={!statorLaminationData}
        onClick={handleSubmit}
        color={laminationSubmitError ? 'error' : 'primary'}
      >
        Submit
      </Button>
    </Stack>
  )
}
