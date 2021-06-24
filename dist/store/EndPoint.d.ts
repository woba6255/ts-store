import { IEndPoint, IStoreDBAdapter } from './store.types';
import { Json, JsonArray } from './json.types';
export declare type EndPointsTypes = string | number | boolean | Json | JsonArray;
export declare type EndPointsTypesString = 'string' | 'number' | 'boolean' | 'Json' | 'JsonArray';
export declare class EndPoint implements IEndPoint {
    private readonly adapter;
    private readonly map;
    private readonly type?;
    _map: string;
    constructor(adapter: IStoreDBAdapter, map: Function, type?: "string" | "number" | "boolean" | "Json" | "JsonArray" | undefined);
    get(): EndPointsTypes | undefined | null;
    set(toSave: EndPointsTypes): void;
    nullify(): void;
    checkType(toCheckType: EndPointsTypes): boolean | undefined;
}
