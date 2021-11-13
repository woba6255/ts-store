import { Store } from '../store'

// instance see end edit json file
// By default it 'db.json'
const instance = new Store('db.json')
const {createStore, EP, EPR} = instance.endPointSystem()

// Use endpoints to declare schema
// A number of reserved words are used that you cannot use in the schema
// It: get, set, nullify, delete
export const schema = {
    appInfo: EP<{ name: string, version: string }>(),
    stat: {
        loadedTimes: EP<number>()
    },
    fetched: EPR('string'),
    DELETE_ME_PLEASE: EP<'DELETE_ME_PLEASE'>(),
}

// Create typed store by schema.
// U cant declare many stores width one "instance".
const store = createStore(schema)

function initializeStore() {
    store.set({
        appInfo: {
            name: 'HW!',
            version:  '1.0.0'
        },
        DELETE_ME_PLEASE: 'DELETE_ME_PLEASE'
    })
}

if (!store.appInfo.get()) initializeStore()

// Here is a little predefined behavior of the node-json-db library.
// By default can get error here, if cant find store.stat.loadedTimes route in json.
// BUT this error will ignore and get just return undefined.
store.stat.loadedTimes.set((store.stat.loadedTimes.get() || 0) + 1)


function fetchEmulator(): Promise<string> {
    return new Promise((resolve => {
        setTimeout(() => {
            console.log('Start test endpoint runtime work')
            const string = 228 as unknown as string
            resolve(string)
        }, 2000)
    }))
}

(async () => {
    // this set throw Error
    // Because in schema declared Endpoint Runtime width string type check
   try {
       store.fetched.set(await fetchEmulator())
   } catch (e: any) { // Community recommend not use any in catch
       console.log('SERVER GET ME NOT TRUE DATA!!!', e?.message);
   }
})()


store.DELETE_ME_PLEASE.delete()


// That code will create db.jon file width that code
// {
//     "appInfo": {
//         "name": "HW!",
//         "version": "1.0.0"
//     },
//     "stat": {
//         "loadedTimes": 14
//     }
// }