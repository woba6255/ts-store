import { EndPointsTypes } from './EndPoint'
import { Json, JsonArray } from './json.types'


export declare class IStoreDBAdapter<Type = EndPointsTypes> {
    set(map: string, toSave: Type): void

    get(map: string): Type | undefined | null

    nullify(map: string): void

    constructor()
}


//export declare type IStoreApiTypeForObject<StoreObject> =
//    IEndPoint<StoreObject>
//    & IStoreApiTypeForObjectIterator<StoreObject>
//
//declare type IStoreApiTypeForObjectIterator<StoreObject> = {
//    [KEY in keyof StoreObject]:
//    StoreObject[KEY] extends IEndPoint
//        ? extractGeneric<StoreObject[KEY]>
//        : IEndPoint<StoreObject[KEY]> & StoreObject[KEY]
//}


export declare type IEndPoint<Type = EndPointsTypes, > = {
    get(): ICreateTypesInStore<Type, 'OBJECT'> | undefined | null,
    set(value: Type): void,
    nullify(): void,
}

export declare type ICreateTypesInStore<StoreObject, MODE> =
    IPoint<StoreObject, MODE> & IStoreCreateTypesIterator<StoreObject, MODE>

export declare type IStoreCreateTypesIterator<StoreObject, MODE> =  {
    [KEY in keyof StoreObject]:
    keyof StoreObject[KEY] extends []
        ? IPoint<StoreObject[KEY], MODE>
        : IPoint<StoreObject[KEY], MODE> & IStoreCreateTypesIterator<StoreObject[KEY], MODE>
}



export declare type IPoint<Type = EndPointsTypes, MODE = 'OBJECT'> =
    MODE extends 'STORE'
        ? IEndPoint<Type>
        : Type

//HELPERS:
export type extractGeneric<Type> = Type extends IPoint<infer X> ? X : never

//export declare type IEPM<Type> = IEndPointModify<Type>
//export declare type IEndPointModify<StoreObject> = IEndPoint<ENP<StoreObject>>
//type ENP<StoreObject> = {
//    [KEY in keyof StoreObject]:
//    StoreObject[KEY] extends IEndPoint
//        ? extractGeneric<StoreObject[KEY]>
//        : ENP<StoreObject[KEY]>
//}
//
//export declare type IEP<Type> = IEndPoint<Type>
//type IEndPointModify2<StoreObject> = {
//    [KEY in keyof StoreObject]:
//    StoreObject[KEY] extends IEndPoint
//        ? extractGeneric<StoreObject[KEY]>
//        : IEndPointModify<StoreObject[KEY]>
//}
