import { NodeJsonDBAdapter } from './Adapter';
import { EndPoint, EndPointsTypes, EndPointsTypesString } from './EndPoint';
import { Json, JsonArray } from './json.types';
import { IStoreDBAdapter, IEndPoint, ICreateTypesInStore } from './store.types';
export declare class StoreInstance<T> {
    readonly config?: any;
    readonly dbAdapter: typeof NodeJsonDBAdapter;
    readonly adapter: IStoreDBAdapter;
    constructor(config?: any, dbAdapter?: typeof NodeJsonDBAdapter);
    createEndPoints(): {
        EP: <Type>(map: Function) => IEndPoint<Type>;
        EPR: {
            <TYPE = string>(type: "string", map: Function): IEndPoint<TYPE>;
            <TYPE_1 = number>(type: "number", map: Function): IEndPoint<TYPE_1>;
            <TYPE_2 = boolean>(type: "boolean", map: Function): IEndPoint<TYPE_2>;
            <TYPE_3 = Json>(type: "Json", map: Function): IEndPoint<TYPE_3>;
            <TYPE_4 = JsonArray>(type: "JsonArray", map: Function): IEndPoint<TYPE_4>;
        };
    };
    EP(map: Function): EndPoint;
    EPR(type: EndPointsTypesString, map: Function): IEndPoint<EndPointsTypes>;
    useV2(storeInstanceCreatedEndPoints: any): {
        createStore: <T_1>(schema: T_1) => ICreateTypesInStore<T_1, "STORE">;
        EP: <T_2>() => T_2;
        EPR: <T_3>(a: any) => T_3;
    };
}
