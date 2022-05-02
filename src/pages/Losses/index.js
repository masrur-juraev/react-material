import React, {useCallback, useEffect, useState} from 'react'
import {
  Button,
  Card,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField
} from '@material-ui/core'
import {LOSS_DATA, PROJECT_NAME} from "../../utils/constants";
import Page from "../../customComponents/Page";
import {useDispatch, useSelector} from "react-redux";
import useAuth from "../../hooks/useAuth";
import useError from "../../hooks/useError";
import {apiClient} from "../../utils/api";
import LossesImage from "./LossesImage";
import {onSetLossData, onSetLossParam, onSetLossType} from "../../store/actions/loss";

export default function Loss() {

  const dispatch = useDispatch();
  const { idToken } = useAuth();
  const { lossesSubmitError } = useError();
  const { loadedMachine, newLossId } = useSelector(state => state.machine);
  const { rotorLaminationType } = useSelector(state => state.rotor);
  const { lossType, lossData } = useSelector(state => state.loss);
  const [lossID, setLossID] = useState(null);

  useEffect(() => {
    if (loadedMachine && loadedMachine.loss) {
      const loadedLoss = loadedMachine.loss;
      setLossID(loadedLoss.id);
      dispatch(onSetLossType(loadedLoss.type));
      dispatch(onSetLossData(loadedLoss.data));
    } else if (newLossId) {
      setLossID(newLossId);
    }
  }, [loadedMachine, dispatch, newLossId]);

  useEffect(() => {
    if (rotorLaminationType) {
      onGetLossData(rotorLaminationType);
    }
  }, [rotorLaminationType]);

  const onGetLossData = useCallback((rotorType) => {
    if (rotorType === 'LamSlot') {
      dispatch(onSetLossType('WRSM'));
      const data = {};
      Object.keys(LOSS_DATA['WRSM']).map((itemKey) => {
        data[itemKey] = {'loss': LOSS_DATA['WRSM'][itemKey]['loss']};
        return true;
      });
      dispatch(onSetLossData(data));
    } else if (rotorType === 'LamHole') {
      dispatch(onSetLossType('IPMSM'));
      const data = {};
      Object.keys(LOSS_DATA['IPMSM']).map((itemKey) => {
        data[itemKey] = {'loss': LOSS_DATA['IPMSM'][itemKey]['loss']};
        return true;
      });
      dispatch(onSetLossData(data));
    }
  }, [LOSS_DATA]);

  const handleSubmit = useCallback(async () => {
    const payload = {};
    Object.keys(lossData).map(itemKey => {
      payload[itemKey] = {'loss': lossData[itemKey]['loss']};
      return true
    });

    const reqData = {
      type: lossType,
      data: {...payload}
    };
    if (lossID) {
      const res = await apiClient(idToken).patch(`/machine/loss/${lossID}/`, reqData);
      console.log('Loss data is saved', res.data);
    }
  }, [lossData, lossType, lossID]);

  const handleChangeLoss = (key, value) => {
    dispatch(onSetLossParam(key, value));
  };

  return (
    <Page title={`Losses | ${PROJECT_NAME}`} sx={{height:'100%', display: 'flex'}}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <TableContainer component={Card}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ py: 1, width: '60%' }}>Component</TableCell>
                <TableCell sx={{ py: 1, width: '40%' }}>Loss</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {lossData && (
                Object.keys(lossData).map((itemKey, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>{ itemKey }</TableCell>
                      <TableCell>
                        <TextField
                          type="number"
                          inputProps={{ min: 0 }}
                          size="small"
                          value={lossData[itemKey]['loss']}
                          onChange={(e) => handleChangeLoss(itemKey, e.target.value)}
                        />
                      </TableCell>
                    </TableRow>
                  )
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Button
          variant="contained"
          disabled={!lossData}
          onClick={handleSubmit}
          color={lossesSubmitError ? 'error' : 'primary'}
        >
          Submit
        </Button>
      </div>
      <div>
        <LossesImage />
      </div>
    </Page>
  )
}
