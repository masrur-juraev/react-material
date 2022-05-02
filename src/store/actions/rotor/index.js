import * as actionTypes from '../actionTypes';
import s3 from "../../../utils/s3";

export const onInitRotorParams = () => ({
  type: actionTypes.INIT_ROTOR_PARAMS
});

export const onSetRotorLaminationData = (data) => ({
  type: actionTypes.SET_ROTOR_LAMINATION_DATA,
  payload: data
});

export const onSetRotorLaminationParam = (key, value) => ({
  type: actionTypes.SET_ROTOR_LAMINATION_PARAM,
  payload: {key, value}
});

export const onSetRotorLaminationType = (type) => ({
  type: actionTypes.SET_ROTOR_LAMINATION_TYPE,
  payload: type
});

export const onSetRotorSlotType = (type) => ({
  type: actionTypes.SET_ROTOR_SLOT_TYPE,
  payload: type
});

export const onSetRotorSlotData = (data) => ({
  type: actionTypes.SET_ROTOR_SLOT_DATA,
  payload: data
});

export const onSetRotorSlotParam = (key, value) => ({
  type: actionTypes.SET_ROTOR_SLOT_PARAM,
  payload: {slotKey: key, slotValue: value}
});

export const onSetRotorConductorType = (type) => ({
  type: actionTypes.SET_ROTOR_CONDUCTOR_TYPE,
  payload: type
});

export const onSetRotorConductorData = (data) => ({
  type: actionTypes.SET_ROTOR_CONDUCTOR_DATA,
  payload: data
});

export const onSetRotorConductorParam = (key, value) => ({
  type: actionTypes.SET_ROTOR_CONDUCTOR_PARAM,
  payload: {conductorKey: key, conductorValue: value}
});

export const onSetRotorHoleType = (type) => ({
  type: actionTypes.SET_ROTOR_HOLE_TYPE,
  payload: type
});

export const onSetRotorHoleData = (data) => ({
  type: actionTypes.SET_ROTOR_HOLE_DATA,
  payload: data
});

export const onSetRotorHoleParam = (key, value) => ({
  type: actionTypes.SET_ROTOR_HOLE_PARAM,
  payload: {holeKey: key, holeValue: value}
});

export const onSetRotorSlotImageURL = (URL) => ({
  type: actionTypes.SET_ROTOR_SLOT_IMAGE_URL,
  payload: URL
});

export const onGetRotorSlotImage = (slotType) => {
  return (dispatch) => {
    s3.getSignedUrlPromise('getObject', {
      Bucket: process.env.REACT_APP_BUCKET_NAME,
      Key: `Images/Slots/${slotType}.png`,
    }).then(url => {
      dispatch(onSetRotorSlotImageURL(url));
      dispatch(onSetRotorHoleImageURL(''));
    }).catch(() => {
      dispatch(onSetRotorSlotImageURL(''));
      dispatch(onSetRotorHoleImageURL(''));
    })
  }
};

export const onSetRotorConductorImageURL = (URL) => ({
  type: actionTypes.SET_ROTOR_CONDUCTOR_IMAGE_URL,
  payload: URL
});

export const onGetRotorConductorImage = (conductorType) => {
  return (dispatch) => {
    s3.getSignedUrlPromise('getObject', {
      Bucket: process.env.REACT_APP_BUCKET_NAME,
      Key: `Images/Conductors/${conductorType}.png`,
    }).then(url => {
      dispatch(onSetRotorConductorImageURL(url));
    }).catch(() => {
      dispatch(onSetRotorConductorImageURL(''));
    })
  }
};

export const onSetRotorHoleImageURL = (URL) => ({
  type: actionTypes.SET_ROTOR_HOLE_IMAGE_URL,
  payload: URL
});

export const onGetRotorHoleImage = (holeType) => {
  return (dispatch) => {
    s3.getSignedUrlPromise('getObject', {
      Bucket: process.env.REACT_APP_BUCKET_NAME,
      Key: `Images/Holes/${holeType}.png`,
    }).then(url => {
      dispatch(onSetRotorHoleImageURL(url));
      dispatch(onSetRotorSlotImageURL(''));
      dispatch(onSetRotorConductorImageURL(''));
    }).catch(() => {
      dispatch(onSetRotorHoleImageURL(''));
      dispatch(onSetRotorSlotImageURL(''));
      dispatch(onSetRotorConductorImageURL(''));
    })
  }
};

export const onSetRotorMainImageURL = (URL) => ({
  type: actionTypes.SET_ROTOR_MAIN_IMAGE_URL,
  payload: URL
});

export const onGetRotorMainImage = (machineID) => {
  return (dispatch) => {
    s3.getSignedUrlPromise('getObject', {
      Bucket: process.env.REACT_APP_BUCKET_NAME,
      Key: `${machineID}/MachinePlot.png`,
    }).then(url => {
      dispatch(onSetRotorMainImageURL(url));
    }).catch(() => {
      dispatch(onSetRotorMainImageURL(''));
    })
  }
};