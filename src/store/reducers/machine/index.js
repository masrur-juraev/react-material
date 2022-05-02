import { updateObject }  from '../../util/index';
import * as actionTypes from '../../actions/actionTypes';

const initialState = {
  machineLoading: false,
  newMachineId: null,
  newRotorId: null,
  newStatorId: null,
  newHousingId: null,
  newLossId: null,
  machines: [],
  loadedMachine: null
};

const machineReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_MACHINE_LOADING:
      return updateObject(state, {
        machineLoading: action.payload
      });

    case actionTypes.NEW_MACHINE_CREATED:
      const payload = action.payload;
      return updateObject(state, {
        newMachineID: payload['id'],
        newRotorId: payload['rotor'],
        newStatorId: payload['stator'],
        newHousingId: payload['housing'],
        newLossId: payload['loss']
      });

    case actionTypes.EMPTY_NEW_IDS:
      return updateObject(state, {
        newMachineID: null,
        newRotorId: null,
        newStatorId: null,
        newHousingId: null,
        newLossId: null
      });

    case actionTypes.SUCCESS_GETTING_MACHINES:
      const machines = action.payload;
      let machineArray = [];
      for(let i in machines) {
        machineArray.push(machines[i]);
      }
      return updateObject(state, {
        machines: machineArray
      });

    case actionTypes.LOAD_MACHINE:
      return updateObject(state, {
        loadedMachine: action.payload
      });

    default:
      return state;
  }
};

export default machineReducer;