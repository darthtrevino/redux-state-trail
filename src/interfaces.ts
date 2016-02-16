import * as Redux from "redux";

export interface IStateHistory {
  stateHistory: {
    states: IState[];
    nextId: number;
  } 
};

export interface IState {
  state?: any;
  action?: any;
  timestamp?: any;
  id?: number;
};

export interface IStoreEnhancerOptions {
  capacity?: number;
}

export type IStoreEnhancer = (createStore: IReduxCreateStore) => IReduxCreateStore;
export type IReduxCreateStore = (reducer: Redux.Reducer, initialState?: any) => Redux.Store;
export type IStateTrailStoreEnhancer = (hydratingState?: IStateHistory) => IStoreEnhancer;
