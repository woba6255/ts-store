"use strict";
exports.__esModule = true;
var store_1 = require("./store");
// TODO = REfactor!!
var storeInstance = new store_1.StoreInstance();
//const { EP, EPR } = storeInstance.createEndPoints()
var _a = createStore500IQ(storeInstance.createEndPoints()), createStore = _a.createStore, EP = _a.EP;
exports.schema = {
    appInfo: {
        version: EP() // TODO
    },
    apps: {
        ap: {
            cssModify: EP() // TODO
        }
    },
    stat: {
        loadedTimes: EP() // TODO
    }
};
var store = createStore(exports.schema);
a();
store.appInfo.version.set('123123123123132313211');
function a() {
    var storeInstance = new store_1.StoreInstance();
    var EP = storeInstance.createEndPoints().EP;
    var schema = {
        appInfo: {
            version: EP(function () { return schema.appInfo.version; }) // TODO
        },
        apps: {
            ap: {
                cssModify: EP(function () { return schema.apps.ap.cssModify; }) // TODO
            }
        },
        stat: {
            loadedTimes: EP(function () { return schema.stat.loadedTimes; }) // TODO
        }
    };
    schema.appInfo.version.set('123');
}
function createStore500IQ(storeInstanceCreatedEndPoints) {
    var epkey = 'SUPER_500IQ_STORE_ALIAS_TO_ENDPOINT_PLUS_HASH_12345678901234567890';
    var EPodl = storeInstanceCreatedEndPoints.EP;
    var EPRold = storeInstanceCreatedEndPoints.EPR;
    var EP;
    //@ts-ignore
    EP = epkey;
    //    const EPR = () => 'SUPER_500IQ_STORE_ALIAS_TO_ENDPOINT_RUNTIME_PLUS_HASH_12345678901234567890'
    //@ts-ignore
    var createStore = function (schema) { return keyofGlist(schema); };
    return {
        createStore: createStore, EP: EP
    };
    // Craeet new obj width replaced EndPoint key to normal endPoint
    function keyofGlist(object) {
        var obj = new Object(object);
        getKeyByValue(obj);
        return obj;
    }
    function ge(obj) {
    }
    // NAME - ZALUPA
    function getKeyByValue(object, h) {
        if (h === void 0) { h = ''; }
        return Object.keys(object).find(function (key) {
            var strHistory = h + '.' + key;
            if (object[key] === epkey)
                replaceToByKey(object, key, EPodl(strHistory));
            if (object[key] && typeof object[key] === 'object')
                getKeyByValue(object[key], key);
        });
    }
    function replaceToByKey(obj, k, to) {
        k.forEach(function (el) {
            obj[el] = to;
        });
    }
}
