import { TypedStore } from "../store/index.js";
import { NodeJsonDBAdapter } from "../Adapters/NodeJsonDBAdapter.js";

type State = {
    test: {
        field: string
    },
    another: {
        object: {
            alpha: number
            bravo: string
            charlie: boolean
        },
        someValue: string
    }
}

const { store} = new TypedStore<State>(new NodeJsonDBAdapter());

await store.test.field.set('Hello, World!');
const helloWorld = await store.test.field.get();

console.log(helloWorld) // Hello, World!

// db.json file contents:
// {
//     "test": {
//         "field": "Hello, World!"
//     }
// }
