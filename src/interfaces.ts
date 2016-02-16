import * as Redux from "redux";

export interface IState {
  state?: any;
  action?: any;
  timestamp?: any;
};

export interface IStateTrail {
  push(state: IState);
  getTrail(): IState[];
  setTrail(trail: IState[]);
}

export interface IMiddlewareOptions {
  capacity?: number;
  stateTrail?: IStateTrail;
}
