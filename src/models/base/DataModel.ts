import BaseDataModel from 'utils/dataModel/BaseDataModel';

import { ID, Obj } from 'constants/types';

let clientIdCounter = 1;

abstract class DataModel<M extends Obj> extends BaseDataModel<M> {
  /**
   * Temporary id used for creating case
   */
  clientId?: ID;

  clientDeleteAt?: number;

  clientCreateAt?: number;

  setClientId() {
    this.clientId = `${this.constructor.name}-${clientIdCounter++}`;
  }

  setClientDeleteAt() {
    this.clientDeleteAt = Date.now();
  }

  setClientCreateAt() {
    this.clientCreateAt = Date.now();
  }

  get dataId() {
    return this.clientId ?? this.id;
  }
}

export default DataModel;
