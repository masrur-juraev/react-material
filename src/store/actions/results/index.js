import * as actionTypes from '../actionTypes';

export const onSuccessLoadResults = (loaded) => ({
  type: actionTypes.GET_RESULTS_SUCCESS,
  payload: loaded
});