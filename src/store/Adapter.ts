import { JsonDB } from 'node-json-db'
import { IStoreDBAdapter } from './store.types'
import { EndPointsTypes } from './EndPoint'


export class NodeJsonDBAdapter implements IStoreDBAdapter {
    private db: JsonDB
    constructor(
        private readonly config: {}
    ) {
        this.db = new JsonDB("TEST.DB", true, true, '/')
    }

    public set(map: string, toSave: EndPointsTypes): void {
        this.db.push(map, toSave)
    }
    public get(map: string): EndPointsTypes {
        return this.db.getData(map)
    }

    public nullify(map: string): void {
        this.db.push(map, null)
    }

}
