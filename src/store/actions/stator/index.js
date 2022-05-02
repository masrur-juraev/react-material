import * as actionTypes from '../actionTypes';
import s3 from "../../../utils/s3";

export const onInitStatorParams = () => ({
  type: actionTypes.INIT_STATOR_PARAMS
});

export const onSetStatorLaminationData = (data) => ({
  type: actionTypes.SET_STATOR_LAMINATION_DATA,
  payload: data
});

export const onSetStatorLaminationParam = (key, value) => ({
  type: actionTypes.SET_STATOR_LAMINATION_PARAM,
  payload: {key, value}
});

export const onSetStatorLaminationType = (type) => ({
  type: actionTypes.SET_STATOR_LAMINATION_TYPE,
  payload: type
});

export const onSetStatorSlotType = (type) => ({
  type: actionTypes.SET_STATOR_SLOT_TYPE,
  payload: type
});

export const onSetStatorSlotData = (data) => ({
  type: actionTypes.SET_STATOR_SLOT_DATA,
  payload: data
});

export const onSetStatorSlotParam = (key, value) => ({
  type: actionTypes.SET_STATOR_SLOT_PARAM,
  payload: {slotKey: key, slotValue: value}
});

export const onSetStatorConductorType = (type) => ({
  type: actionTypes.SET_STATOR_CONDUCTOR_TYPE,
  payload: type
});

export const onSetStatorConductorData = (data) => ({
  type: actionTypes.SET_STATOR_CONDUCTOR_DATA,
  payload: data
});

export const onSetStatorConductorParam = (key, value) => ({
  type: actionTypes.SET_STATOR_CONDUCTOR_PARAM,
  payload: {conductorKey: key, conductorValue: value}
});

const onSetStatorSlotImageURL = (URL) => ({
  type: actionTypes.SET_STATOR_SLOT_IMAGE_URL,
  payload: URL
});

export const onGetStatorSlotImage = (slotType) => {
  return (dispatch) => {
    s3.getSignedUrlPromise('getObject', {
      Bucket: process.env.REACT_APP_BUCKET_NAME,
      Key: `Images/Slots/${slotType}.png`,
    }).then(url => {
      dispatch(onSetStatorSlotImageURL(url));
    }).catch(() => {
      dispatch(onSetStatorSlotImageURL(''));
    })
  }
};

const onSetStatorConductorImageURL = (URL) => ({
  type: actionTypes.SET_STATOR_CONDUCTOR_IMAGE_URL,
  payload: URL
});

export const onGetStatorConductorImage = (conductorType) => {
  return (dispatch) => {
    s3.getSignedUrlPromise('getObject', {
      Bucket: process.env.REACT_APP_BUCKET_NAME,
      Key: `Images/Conductors/${conductorType}.png`,
    }).then(url => {
      dispatch(onSetStatorConductorImageURL(url));
    }).catch(() => {
      dispatch(onSetStatorConductorImageURL(''));
    })
  }
};

const onSetStatorMainImageURL = (URL) => ({
  type: actionTypes.SET_STATOR_MAIN_IMAGE_URL,
  payload: URL
});

export const onGetStatorMainImage = (machineID) => {
  return (dispatch) => {
    s3.getSignedUrlPromise('getObject', {
      Bucket: process.env.REACT_APP_BUCKET_NAME,
      Key: `${machineID}/MachinePlot.png`,
    }).then(url => {
      dispatch(onSetStatorMainImageURL(url));
    }).catch(() => {
      dispatch(onSetStatorMainImageURL(''));
    })
  }
};