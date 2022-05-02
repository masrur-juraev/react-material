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
  onGetHousingImage,
  onSetHousingData,
  onSetHousingParam,
  onSetHousingType
} from "../../../../store/actions/housing";
import useAuth from "../../../../hooks/useAuth";

/* ----------------------------------------------------------------- */

export default function Housing() {
  const dispatch = useDispatch();
  const { idToken } = useAuth();
  const { housingSubmitError } = useError();
  const { housing } = FORM_DATA;
  const { newHousingId, loadedMachine } = useSelector(state => state.machine);
  const { housingType, housingData } = useSelector(state => state.housing);

  useEffect(() => {
    if (loadedMachine && loadedMachine.housing) {
      const loadedHousing = loadedMachine.housing;
      if (loadedHousing.type !== 'housing') {
        dispatch(onSetHousingType(loadedHousing.type));
        dispatch(onSetHousingData(loadedHousing.data));
        dispatch(onGetHousingImage(loadedHousing.type));
      }
    }
  }, [loadedMachine, dispatch]);

  const handleHousingType = useCallback((value) => {
    dispatch(onSetHousingType(value));
    dispatch(onSetHousingData(housing[value]));
    dispatch(onGetHousingImage(value));
  }, [housing]);

  const handleHousingData = (key, value) => {
    dispatch(onSetHousingParam(key, value));
  };

  const handleSubmit = async () => {
    const cloneHousingData = { ...housingData };
    delete cloneHousingData.Type;

    const reqData = {
      type: housingType,
      // material: cloneHousingData.Material,
      data: {
        ...cloneHousingData
      }
    };
    if (newHousingId || loadedMachine) {
      const housingId = newHousingId ? newHousingId : loadedMachine.housing.id;
      const res = await apiClient(idToken).patch(`/machine/housing/${housingId}/`, reqData);
      console.log('This is response from new saved ID - Housing:', res.data);
    }
    // submitHousing(reqData)
  }

  return (
    <Stack spacing={2}>
      <TextField
        select
        name="Housing Type"
        label="Housing Type"
        variant="outlined"
        size="small"
        value={housingType}
        onChange={(e) => handleHousingType(e.target.value)}
      >
        {Object.keys(FORM_DATA.housing).map((housingItemKey,index) => (
          <MenuItem key={index} value={housingItemKey}>
            {housingItemKey}
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
            {housingData &&
            Object.keys(housingData).map((housingDataItemKey,index) => {
              if (housingDataItemKey !== 'Type') {
                if (
                  housingDataItemKey === 'Material'
                ) {
                  return (
                    <TableRow key={housingDataItemKey}>
                      <TableCell sx={{ py: 1 }}>
                        {housingDataItemKey}
                      </TableCell>
                      <TableCell sx={{ py: 1 }}>
                        <TextField
                          select
                          variant="outlined"
                          name="housing Material"
                          value={housingData[housingDataItemKey]}
                          onChange={(e) =>
                            handleHousingData(
                              housingDataItemKey,
                              e.target.value,
                            )
                          }
                          size="small"
                        >
                          {Object.keys(FORM_DATA.material).map(
                            (materialItemKey) => (
                              <MenuItem
                                key={materialItemKey}
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
                    <TableRow key={housingDataItemKey}>
                      <TableCell sx={{ py: 1 }}>
                        {housingDataItemKey}
                      </TableCell>
                      <TableCell sx={{ py: 1 }}>
                        <TextField
                          type="number"
                          inputProps={{ min: 0 }}
                          size="small"
                          value={housingData[housingDataItemKey] || ''}
                          onChange={(e) =>
                            handleHousingData(
                              housingDataItemKey,
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
        disabled={!housingData}
        onClick={handleSubmit}
        color={housingSubmitError ? 'error' : 'primary'}
      >
        Submit
      </Button>
    </Stack>
  )
}
