import { Obj, ID, Any, AttrField } from 'constants/types';
// import { cloneDeep, omitBy } from 'lodash';

abstract class BaseDataModel<Model extends Obj> {
  // ID
  id: ID = 0;

  // Auto generate created date
  createdAt?: string;

  updatedAt?: string;

  deletedAt?: string;

  protected static _baseField: AttrField<BaseDataModel<Obj>, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'> = {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt',
  };

  // Data loaded from BackEnd
  loaded = false;

  // Init data in constructor
  protected init(obj: Obj) {
    for (const propertyKey in this) {
      if (!['$', '_'].includes(propertyKey[0]) && obj[propertyKey] !== undefined) {
        this[propertyKey] = obj[propertyKey];
      }
    }
  }

  // Assign values to current model, exclude id, createdAt, updatedAt
  // This method is fast but does not check type
  public assign<Attr extends keyof Model>(newValues: Record<Attr, Model[Attr]>) {
    for (const attr in newValues) {
      if (attr in this && !['id', 'createdAt', 'updatedAt'].includes(attr)) {
        // @ts-ignore
        this[attr] = newValues[attr];
      }
    }

    return this;
  }

  // Assign values from an object
  // "attrFieldMap" is used to map from object to model, key is attribute name of model, value is field name of object
  // "attrParserMap" is used to format and/or transform value from object to model
  protected _assignFromObject<ValueObj extends Obj>(
    valueObj: ValueObj,
    attrFieldMap: { [attr in keyof Model]?: keyof ValueObj },
    attrParserMap?: {
      [attr in keyof Model]?: { type: 'item' | 'array'; transform: (value: Any) => Any } | { type: 'number' };
    }
  ) {
    let attr: keyof Model;
    for (attr in attrFieldMap) {
      const field = attrFieldMap[attr] as keyof ValueObj;
      const value = valueObj[field];

      if (value === undefined || !(attr in this)) {
        continue;
      }

      if (attrParserMap?.[attr] && value != null) {
        switch (attrParserMap[attr]?.type) {
          case 'item':
            // @ts-ignore
            this[attr] = attrParserMap[attr].transform(value);
            continue;

          case 'array':
            // @ts-ignore
            this[attr] = value.map(attrParserMap[attr].transform);
            continue;

          case 'number':
            // @ts-ignore
            this[attr] = Number(value);
            continue;
        }
      }

      // @ts-ignore
      this[attr] = value;
    }
  }

  // Extract current model to a plant object
  // public toObject(): MethodExcludedProperties<Partial<Model>> {
  //   const obj: Obj = {};

  //   for (const propertyKey in this) {
  //     obj[propertyKey] = this[propertyKey];
  //   }

  //   return obj as MethodExcludedProperties<Partial<Model>>;
  // }

  // Map from server response payload
  _fromBaseResDto(payload: Obj): this {
    if (payload.id) {
      this.id = payload.id;
    }
    if (payload.createdAt) {
      this.createdAt = payload.createdAt;
    }
    if (payload.updatedAt) {
      this.updatedAt = payload.updatedAt;
    }
    this.loaded = true;

    return this;
  }

  // Self clone
  // clone(): this {
  //   return cloneDeep(this);
  // }

  // set(attr: keyof Model, value: Model[keyof Model]) {
  //   if (attr in this) {
  //     // @ts-ignore
  //     this[attr] = value;
  //   }

  //   return this;
  // }

  // omitUndefined(payload: Obj): Obj {
  //   return omitBy(payload, value => value === undefined);
  // }
}

export default BaseDataModel;
