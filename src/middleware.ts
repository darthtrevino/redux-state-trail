import { IMiddlewareOptions } from './interfaces';
import * as _ from "lodash";
import StateTrail from "./StateTrail";

/**
 * State-Trailing Middleware
 */
export default function middleware(options: IMiddlewareOptions) {
    const stateTrail = options.stateTrail || new StateTrail(options.capacity);
    return store => next => action => {
        const timestamp = new Date();
        const result = next(action);
        const newHistoryItem = {
          timestamp,
          state: store.getState(),
          action
        };
        stateTrail.push(newHistoryItem);
        return result;
    }
}
