import {
  IStateHistory
} from './interfaces';

export const ActionTypes = {
  INJECT_HISTORY: 'INJECT_HISTORY'
};

export const ActionCreators = {
  injectHistory(history: IStateHistory) {
    return {type: ActionTypes.INJECT_HISTORY, payload: history}
  }
};
