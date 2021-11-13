import { EndPointsTypes } from './EndPoint';


export declare class IStoreDBAdapter<TYPE = EndPointsTypes> {
  set(map: string, toSave: TYPE): void

  get(map: string): TYPE | undefined | null

  nullify(map: string): void

  delete(map: string): void

  constructor()
}



declare type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>
};


export declare type IEndPoint<TYPE = EndPointsTypes> = {
  get(): ICreateTypesInStore<TYPE, 'OBJECT'> | undefined | null
  set(value: TYPE): void
  nullify(): void
  delete(): void
}

export declare type ICreateTypesInStore<OBJECT, MODE> =
  IPoint<OBJECT, MODE> & IStoreCreateTypesIterator<OBJECT, MODE>

export declare type IStoreCreateTypesIterator<OBJECT, MODE> = {
  [KEY in keyof OBJECT]:
  keyof OBJECT[KEY] extends []
    ? IPoint<OBJECT[KEY], MODE>
    : IPoint<OBJECT[KEY], MODE> & IStoreCreateTypesIterator<OBJECT[KEY], MODE>
}


export declare type IPoint<TYPE = EndPointsTypes, MODE = 'OBJECT'> =
  MODE extends 'STORE'
    ? IEndPoint<TYPE extends object ? DeepPartial<TYPE> : TYPE>
    : TYPE
