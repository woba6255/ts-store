import { Config, JsonDB } from 'node-json-db';
import { Json } from "../json.types";
import { TypedStoreAdapter } from "../store/TypedStoreAdapter.js";


export class NodeJsonDBAdapter implements TypedStoreAdapter {
    private db: JsonDB;

    constructor(
        fileName: string = 'db.json',
        humanReadable: boolean = true,
    ) {
        this.db = new JsonDB(new Config(fileName, true, humanReadable, '/'));
    }

    public set(path: string, value: Json) {
        return this.db.push(this.fixPath(path), value);
    }

    public get(path: string) {
        return this.db.getData(this.fixPath(path));
    }

    public delete(path: string) {
        return this.db.delete(this.fixPath(path));
    }

    private fixPath(path: string): string {
        return `fixedField/${path}`
    }
}
