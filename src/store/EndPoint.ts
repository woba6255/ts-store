import { IEndPoint, IStoreDBAdapter } from './store.types'
import { Json, JsonArray } from './json.types'

export type EndPointsTypes = string | number | boolean | Json | JsonArray
export type EndPointsTypesString = 'string' | 'number' | 'boolean' | 'Json' | 'JsonArray'

export class EndPoint implements IEndPoint {
    public _map!: string

    constructor(
        private readonly adapter: IStoreDBAdapter,
        private readonly map: Function,
        private readonly type?: EndPointsTypesString,
    ) {
        const a = String(map).split('.')
        a.shift()
        this._map ='/' + a.join('/')
    }

    public get(): EndPointsTypes | undefined | null {
        return this.adapter.get(this._map)
    }

    public set(toSave: EndPointsTypes): void {
        if (this.type) if (!this.checkType(toSave)) throw new Error(`[TYPE ERROR] PREDICTED: ${this.type}; TOOK: ${typeof toSave} (${toSave})`)
        this.adapter.set(this._map, toSave)
    }

    public nullify(): void {
        this.adapter.nullify(this._map)
    }

    checkType(toCheckType: EndPointsTypes){
        if (this.type && toCheckType){
            const savedType = this.type
            if(savedType === typeof toCheckType) return true
            else return ['Json', 'JsonArray'].includes(<never>savedType) && isJsonStringValid(<string>toCheckType);
        }


    }
}

function isJsonStringValid(str: string):boolean {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}
