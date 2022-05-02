import * as actionTypes from "../../actions/actionTypes";
import {updateObject} from "../../util";

const initialState = {
  rotorLaminationType: '',
  rotorLaminationData: null,
  rotorSlotType: '',
  rotorSlotData: null,
  rotorSlotImageURL: '',
  rotorConductorType: '',
  rotorConductorData: null,
  rotorConductorImageURL: '',
  rotorHoleType: '',
  rotorHoleData: null,
  rotorHoleImageURL: '',
  rotorMainImageURL: ''
};

const rotorReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INIT_ROTOR_PARAMS:
      return updateObject(state, {
        ...initialState
      });

    case actionTypes.SET_ROTOR_LAMINATION_DATA:
      return updateObject(state, {
        rotorLaminationData: action.payload
      });

    case actionTypes.SET_ROTOR_LAMINATION_PARAM:
      const {key, value} = action.payload;
      const newRotorLaminationData = state.rotorLaminationData;
      newRotorLaminationData[key] = value;
      return updateObject(state, {
        rotorLaminationData: newRotorLaminationData
      });

    case actionTypes.SET_ROTOR_LAMINATION_TYPE:
      return updateObject(state, {
        rotorLaminationType: action.payload
      });

    case actionTypes.SET_ROTOR_SLOT_TYPE:
      return updateObject(state, {
        rotorSlotType: action.payload
      });

    case actionTypes.SET_ROTOR_SLOT_DATA:
      return updateObject(state, {
        rotorSlotData: action.payload
      });

    case actionTypes.SET_ROTOR_SLOT_PARAM:
      const {slotKey, slotValue} = action.payload;
      const newRotorSlotData = state.rotorSlotData;
      newRotorSlotData[slotKey] = slotValue;
      return updateObject(state, {
        rotorSlotData: newRotorSlotData
      });

    case actionTypes.SET_ROTOR_CONDUCTOR_TYPE:
      return updateObject(state, {
        rotorConductorType: action.payload
      });

    case actionTypes.SET_ROTOR_CONDUCTOR_DATA:
      return updateObject(state, {
        rotorConductorData: action.payload
      });

    case actionTypes.SET_ROTOR_CONDUCTOR_PARAM:
      const {conductorKey, conductorValue} = action.payload;
      const newRotorConductorData = state.rotorConductorData;
      newRotorConductorData[conductorKey] = conductorValue;
      return updateObject(state, {
        rotorConductorData: newRotorConductorData
      });

    case actionTypes.SET_ROTOR_HOLE_TYPE:
      return updateObject(state, {
        rotorHoleType: action.payload
      });

    case actionTypes.SET_ROTOR_HOLE_DATA:
      return updateObject(state, {
        rotorHoleData: action.payload
      });

    case actionTypes.SET_ROTOR_HOLE_PARAM:
      const {holeKey, holeValue} = action.payload;
      const newRotorHoleData = state.rotorHoleData;
      newRotorHoleData[holeKey] = holeValue;
      return updateObject(state, {
        rotorHoleData: newRotorHoleData
      });

    case actionTypes.SET_ROTOR_SLOT_IMAGE_URL:
      return updateObject(state, {
        rotorSlotImageURL: action.payload
      });

    case actionTypes.SET_ROTOR_CONDUCTOR_IMAGE_URL:
      return updateObject(state, {
        rotorConductorImageURL: action.payload
      });

    case actionTypes.SET_ROTOR_HOLE_IMAGE_URL:
      return updateObject(state, {
        rotorHoleImageURL: action.payload
      });

    case actionTypes.SET_ROTOR_MAIN_IMAGE_URL:
      return updateObject(state, {
        rotorMainImageURL: action.payload
      });

    default:
      return state;

  }
};

export default rotorReducer;