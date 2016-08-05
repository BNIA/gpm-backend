import {current, future} from '../../core/phases';

export default class PhasesCardController {
  constructor() {
    this.current = current;
    this.future = future;
  }
}
