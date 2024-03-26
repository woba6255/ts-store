import { Json } from "../json.types";
import { TypedStoreAdapter } from "./TypedStoreAdapter";
import { StateType, StoreType } from "./types.js";

export class TypedStore<T extends StateType> {
    constructor(
        private readonly adapter: TypedStoreAdapter,
    ) {
    }

    get(path: string[]): Promise<Json> {
        return this.adapter.get(this.joinPath(path))
    }

    set(path: string[], value: Json): Promise<void> {
        return this.adapter.set(this.joinPath(path), value)
    }

    delete(path: string[]): Promise<void> {
        return this.adapter.delete(this.joinPath(path))
    }

    get store() {
        return getProxy([], this) as StoreType<T>
    }

    private joinPath(path: string[]): string {
        return path.join('/')
    }
}

function getProxy(path: string[], store: TypedStore<Json>): Json {
    return new Proxy((() => {
    }) as unknown as Json, {
        get(target, p, receiver) {
            return getProxy([...path, p.toString()], store)
        },
        apply(target, thisArg, argArray) {
            const lastPath = path[path.length - 1]
            const pathToMethod = path.slice(0, -1)

            if (lastPath === 'get') {
                return store.get(pathToMethod)
            }

            if (lastPath === 'set') {
                return store.set(pathToMethod, argArray[0])
            }

            if (lastPath === 'delete') {
                console.log('get', pathToMethod)
            }

            throw new Error(`Unknown method ${lastPath}`)
        }
    })
}

