"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const store_1 = require("./store");
const storeInstance = new store_1.StoreInstance();
const endPoints = storeInstance.createEndPoints();
const { createStore, EP } = storeInstance.useV2(endPoints);
exports.schema = {
    appInfo: {
        name: EP(),
        description: EP(),
        version: EP()
    },
    apps: {
        ap: {
            cssModify: EP()
        }
    },
    stat: {
        loadedTimes: EP()
    },
};
const store = createStore(exports.schema);
function initializeStore() {
    store.set({
        appInfo: {
            name: 'HW!',
            description: 'Default hello world app.',
            version: '1.0.0'
        },
        apps: {
            ap: {
                cssModify: false
            }
        },
        stat: {
            loadedTimes: 0
        },
    });
}
initializeStore();
console.log(store.appInfo.get()?.name);
let i = store.stat.loadedTimes.get();
setInterval(() => {
    store.stat.loadedTimes.set(i++);
}, 500);
