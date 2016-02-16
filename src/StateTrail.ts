import { IState } from './interfaces';

export default class StateTrail {
  private _trail: IState[] = [];

  constructor(private _capacity: number) {
  }

  get trail(): IState[] {
    return this._trail;
  }

  push(state: IState) {
    // Pop off old states if we're overflowing the capacity
    this._trail.push(state);
    if (this._capacity && this._trail.length > this._capacity) {
      this._trail.shift();
    }
  }
}
