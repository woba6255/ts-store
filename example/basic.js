import { TypedStore, NodeJsonDBAdapter } from "../dist/index.js";
const { store } = new TypedStore(new NodeJsonDBAdapter());
await store.test.field.set('Hello, World!');
const helloWorld = await store.test.field.get();
console.log(helloWorld); // Hello, World!
// db.json file contents:
// {
//     "test": {
//         "field": "Hello, World!"
//     }
// }
