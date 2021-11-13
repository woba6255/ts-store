import { JsonDB } from 'node-json-db'
import { IStoreDBAdapter } from './store.types'
import { EndPointsTypes } from './EndPoint'


export class NodeJsonDBAdapter implements IStoreDBAdapter {
    private db: JsonDB
    constructor(
        private readonly fileName: string = "db.json"
    ) {
        this.db = new JsonDB(fileName, true, true, '/')
    }

    public set(map: string, toSave: EndPointsTypes): void {
        this.db.push(map, toSave)
    }
    public get(map: string): EndPointsTypes {
        try {
            return this.db.getData(map);
        } catch (e: any) {
            if (e?.id !== 5) console.error()
        }
    }

    public nullify(map: string): void {
        this.db.push(map, null)
    }

    public delete(map: string): void {
        this.db.delete(map)
    }

}
