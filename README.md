# TS-Store - a simple and easy nodejs typed store

Provides a friendly interface for storing and typing small amounts of data in JSON format. 
Default: works over of [node-json-db](https://github.com/Belphemur/node-json-db) library, saving data in json file. 
Suitable for small node.js and electron.js applications.

###### Example:
```js
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

const { store } = new TypedStore<State>(new NodeJsonDBAdapter());

await store.test.field.set('Hello, World!');       // setting value in json file
const helloWorld = await store.test.field.get();   // getting value form json file

console.log(helloWorld) // Hello, World!

```
###### db.json file will contents:
```json
 {
     "test": {
         "field": "Hello, World!"
     }
 }
```
