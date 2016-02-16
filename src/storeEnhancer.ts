import {
  IReduxCreateStore,
  IStateHistory,
  IState,
  IStateTrailStoreEnhancer,
  IStoreEnhancer,
  IStoreEnhancerOptions
} from './interfaces';
import * as _ from "lodash";

const INITIAL_STATE: IStateHistory = {
  stateHistory: {
    states: [],
    nextId: 0
  }
};

/**
 * Store enhancer that adds state a state-trail
 */
export default function storeEnhancer(initialState: IStateHistory = INITIAL_STATE, options: IStoreEnhancerOptions) {
    return (createStore: IReduxCreateStore) =>
      (reducer: Redux.Reducer, state = initialState) =>
        createStore(trackStateTrail(reducer, state, options));
}

/**
 * Higher-order reducer-wrapper to create a state trail
 */
function trackStateTrail(reducer, initialState: IStateHistory = INITIAL_STATE, options: IStoreEnhancerOptions = {}): Redux.Reducer {
  return function(state = initialState, action) {
    const newState = reducer(state, action);
    const stateHistory = newState.stateHistory;
    const trailCapacity = options.capacity;

    if (!stateHistory.states) {
      stateHistory.states = [];
      stateHistory.nextId = 0;
    }

    // Push the current State Data into the history (without the History Attached)
    const stateWithoutHistory = _.assign({}, newState);
    delete stateWithoutHistory['stateHistory'];
    const newHistoryItem: IState = {
      timestamp: Date.now(),
      state: stateWithoutHistory,
      id: newState.stateHistory.nextId
    };

    // Pop off old states if we're overflowing the capacity
    stateHistory.states.push(newHistoryItem);
    stateHistory.nextId++;
    if (trailCapacity && stateHistory.states.length > trailCapacity) {
      stateHistory.states.shift();
    }
    
    return newState;
  };
}
