import { updateObject }  from '../../util/index';
import * as actionTypes from '../../actions/actionTypes';

const initialState = {
  statorLaminationType: '',
  statorLaminationData: null,
  statorSlotType: '',
  statorSlotData: null,
  statorSlotImageURL: '',
  statorConductorType: '',
  statorConductorData: null,
  statorConductorImageURL: '',
  statorMainImageURL: ''
};

const statorReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INIT_STATOR_PARAMS:
      return updateObject(state, {
        ...initialState
      });

    case actionTypes.SET_STATOR_LAMINATION_DATA:
      return updateObject(state, {
        statorLaminationData: action.payload
      });

    case actionTypes.SET_STATOR_LAMINATION_PARAM:
      const {key, value} = action.payload;
      const newStatorLaminationData = state.statorLaminationData;
      newStatorLaminationData[key] = value;
      return updateObject(state, {
        statorLaminationData: newStatorLaminationData
      });

    case actionTypes.SET_STATOR_LAMINATION_TYPE:
      return updateObject(state, {
        statorLaminationType: action.payload
      });

    case actionTypes.SET_STATOR_SLOT_TYPE:
      return updateObject(state, {
        statorSlotType: action.payload
      });

    case actionTypes.SET_STATOR_SLOT_DATA:
      return updateObject(state, {
        statorSlotData: action.payload
      });

    case actionTypes.SET_STATOR_SLOT_PARAM:
      const {slotKey, slotValue} = action.payload;
      const newStatorSlotData = state.statorSlotData;
      newStatorSlotData[slotKey] = slotValue;
      return updateObject(state, {
        statorSlotData: newStatorSlotData
      });

    case actionTypes.SET_STATOR_SLOT_IMAGE_URL:
      return updateObject(state, {
        statorSlotImageURL: action.payload
      });

    case actionTypes.SET_STATOR_CONDUCTOR_TYPE:
      return updateObject(state, {
        statorConductorType: action.payload
      });

    case actionTypes.SET_STATOR_CONDUCTOR_DATA:
      return updateObject(state, {
        statorConductorData: action.payload
      });

    case actionTypes.SET_STATOR_CONDUCTOR_PARAM:
      const {conductorKey, conductorValue} = action.payload;
      const newStatorConductorData = state.statorConductorData;
      newStatorConductorData[conductorKey] = conductorValue;
      return updateObject(state, {
        statorConductorData: newStatorConductorData
      });

    case actionTypes.SET_STATOR_CONDUCTOR_IMAGE_URL:
      return updateObject(state, {
        statorConductorImageURL: action.payload
      });

    case actionTypes.SET_STATOR_MAIN_IMAGE_URL:
      return updateObject(state, {
        statorMainImageURL: action.payload
      });

    default:
      return state;
  }
};

export default statorReducer;