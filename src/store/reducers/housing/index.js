import * as actionTypes from "../../actions/actionTypes";
import {updateObject} from "../../util";

const initialState = {
  housingType: '',
  housingData: null,
  housingImageURL: '',
  housingMainImageURL: ''
};

const housingReducer = (state = initialState, action) => {
  switch (action.type) {case actionTypes.INIT_HOUSING_PARAMS:
    return updateObject(state, {
      ...initialState
    });

    case actionTypes.SET_HOUSING_DATA:
      return updateObject(state, {
        housingData: action.payload
      });

    case actionTypes.SET_HOUSING_PARAM:
      const {key, value} = action.payload;
      const newHousingData = state.housingData;
      newHousingData[key] = value;
      return updateObject(state, {
        housingData: newHousingData
      });

    case actionTypes.SET_HOUSING_TYPE:
      return updateObject(state, {
        housingType: action.payload
      });

    case actionTypes.SET_HOUSING_IMAGE_URL:
      return updateObject(state, {
        housingImageURL: action.payload
      });

    case actionTypes.SET_HOUSING_MAIN_IMAGE_URL:
      return updateObject(state, {
        housingMainImageURL: action.payload
      });

    default:
      return state;

  }
};

export default housingReducer;