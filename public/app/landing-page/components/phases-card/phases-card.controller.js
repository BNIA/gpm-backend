import {current, future, clgr} from './phases';

export default class PhasesCardController {
  constructor() {
    this.current = current;
    this.future = future;
    this.clgr = clgr;
  }
}
