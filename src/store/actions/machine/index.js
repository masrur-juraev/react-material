import * as actionTypes from '../actionTypes';
import {apiClient} from "../../../utils/api";

export const setMachineLoading = (loading) => ({
  type: actionTypes.SET_MACHINE_LOADING,
  payload: loading
});

export const newMachineCreated = (payload) => ({
  type: actionTypes.NEW_MACHINE_CREATED,
  payload
});

export const onEmptyNewIds = () => ({
  type: actionTypes.EMPTY_NEW_IDS
});

const successGetMachines = (machines) => ({
  type: actionTypes.SUCCESS_GETTING_MACHINES,
  payload: machines
});

export const onGetMachines = (startLoading, idToken) => {
  return async (dispatch) => {
    startLoading && dispatch(setMachineLoading(true));
    try {
      const res = await apiClient(idToken).get('/machine/dimensions/list_total/');
      if (res && res.data) {
        dispatch(successGetMachines(res.data));
        dispatch(setMachineLoading(false));
      }
    } catch (e) {
      dispatch(successGetMachines({}));
      dispatch(setMachineLoading(false));
    }
  }
};

export const onSaveMachine = (machine) => ({
  type: actionTypes.LOAD_MACHINE,
  payload: machine
});

export const onDeleteSavedMachine = (machineID, idToken, callback) => {
  return async (dispatch) => {
    dispatch(setMachineLoading(true));
    try {
      await apiClient(idToken).delete(`/machine/dimensions/${machineID}/`);
      callback(true);
    } catch (e) {
      callback(false);
      dispatch(setMachineLoading(false));
    }
  }
};