import * as actionTypes from "../actionTypes";
import s3 from "../../../utils/s3";

export const onInitHousingParams = () => ({
  type: actionTypes.INIT_HOUSING_PARAMS
});

export const onSetHousingData = (data) => ({
  type: actionTypes.SET_HOUSING_DATA,
  payload: data
});

export const onSetHousingParam = (key, value) => ({
  type: actionTypes.SET_HOUSING_PARAM,
  payload: {key, value}
});

export const onSetHousingType = (type) => ({
  type: actionTypes.SET_HOUSING_TYPE,
  payload: type
});

const onSetHousingImageURL = (URL) => ({
  type: actionTypes.SET_HOUSING_IMAGE_URL,
  payload: URL
});

export const onGetHousingImage = (housingType) => {
  return (dispatch) => {
    s3.getSignedUrlPromise('getObject', {
      Bucket: process.env.REACT_APP_BUCKET_NAME,
      Key: `Images/Housings/${housingType}.png`,
    }).then(url => {
      dispatch(onSetHousingImageURL(url));
    }).catch(() => {
      dispatch(onSetHousingImageURL(''));
    })
  }
};

const onSetHousingMainImageURL = (URL) => ({
  type: actionTypes.SET_HOUSING_MAIN_IMAGE_URL,
  payload: URL
});

export const onGetHousingMainImage = (machineID) => {
  return (dispatch) => {
    s3.getSignedUrlPromise('getObject', {
      Bucket: process.env.REACT_APP_BUCKET_NAME,
      Key: `${machineID}/MachinePlot.png`,
    }).then(url => {
      dispatch(onSetHousingMainImageURL(url));
    }).catch(() => {
      dispatch(onSetHousingMainImageURL(''));
    })
  }
};