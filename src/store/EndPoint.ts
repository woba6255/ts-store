import { Json } from "../json.types";
import { TypedStore } from "./TypedStore";

export class Endpoint<VALUE extends Json = Json> {
    constructor(
        private readonly store: TypedStore<Json>,
        private readonly path: string[]
    ) {}

    get(): Promise<VALUE> {
        return this.store.get(this.path) as Promise<VALUE>;
    }

    set(value: VALUE): Promise<void> {
        return this.store.set(this.path, value);
    }

    delete(): Promise<void> {
        return this.store.delete(this.path);
    }
}