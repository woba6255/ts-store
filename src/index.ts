import { StoreInstance } from './store'

const storeInstance = new StoreInstance()
const endPoints = storeInstance.createEndPoints()
const {createStore, EP} = storeInstance.useV2(endPoints)


const callSchema = {
    date: EP<string>(),
    number: EP<string>(),
    code: EP<number>(),
}

export const schema = {
    appInfo: {
        name: EP<string>(),
        description: EP<string>(),
        version:  EP<string>()
    },
    apps: {
        ap: {
            cssModify:  EP<false | string>()
        }
    },
    stat: {
        loadedTimes: EP<number>()
    },
}
const store = createStore(schema)

function initializeStore() {
    store.set({
        appInfo: {
            name: 'HW!',
            description: 'Default hello world app.',
            version:  '1.0.0'
        },
        apps: {
            ap: {
                cssModify: false
            }
        },
        stat: {
            loadedTimes: 0
        },
    })
}


initializeStore()

console.log(store.apps.ap.get()?.cssModify)

let i = store.stat.loadedTimes.get() || 0
setInterval(() => {
    store.stat.loadedTimes.set(i++)
}, 500)
