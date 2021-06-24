import { IStoreDBAdapter } from './store.types';
import { EndPointsTypes } from './EndPoint';
export declare class NodeJsonDBAdapter implements IStoreDBAdapter {
    private readonly config;
    private db;
    constructor(config: {});
    set(map: string, toSave: EndPointsTypes): void;
    get(map: string): EndPointsTypes;
    nullify(map: string): void;
}
