"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Adapter_1 = require("./Adapter");
const EndPoint_1 = require("./EndPoint");
class StoreInstance {
    constructor(config, dbAdapter = Adapter_1.NodeJsonDBAdapter) {
        this.config = config;
        this.dbAdapter = dbAdapter;
        this.adapter = new dbAdapter(config);
    }
    createEndPoints() {
        const context = this;
        const EP = (map) => {
            return this.EP.call(context, map);
        };
        function EPR(type, map) {
            return context.EPR.call(context, type, map);
        }
        return {
            EP, EPR
        };
    }
    EP(map) {
        return new EndPoint_1.EndPoint(this.adapter, map);
    }
    EPR(type, map) {
        const types = ['string', 'number', 'boolean', 'Json', 'JsonArray'];
        if (types.includes(type)) {
            //@ts-ignore
            return new EndPoint_1.EndPoint(this.adapter, map, type);
        }
        throw new Error(`${type} - Is not correct type. Expected one of ${types}`);
    }
    useV2(storeInstanceCreatedEndPoints) {
        const epkey = 'SUPER_500IQ_STORE_ALIAS_TO_ENDPOINT';
        const eprkey = 'SUPER_500IQ_STORE_ALIAS_TO_ENDPOINT_RUNTIME';
        const EP_odl = storeInstanceCreatedEndPoints.EP;
        const EPR_old = storeInstanceCreatedEndPoints.EPR;
        let EP;
        let EPR;
        //@ts-ignore
        EP = () => epkey;
        //@ts-ignore
        EPR = (type) => [eprkey, type];
        //@ts-ignore
        const createStore = (schema) => keyofGlist(schema);
        return {
            createStore, EP, EPR
        };
        // Craeet new obj width replaced EndPoint key to normal endPoint
        function keyofGlist(object1) {
            let newObject = Object.create(object1);
            newObject = Object.assign(EP_odl('/'), object1);
            getKeyByValue(newObject, object1);
            //        console.log(object1)
            return newObject;
            // NAME - ZALUPA
            function getKeyByValue(newObject, obj1, h = '') {
                return Object.keys(obj1).find(key => {
                    const strHistory = h + '.' + key;
                    if (obj1[key] === epkey)
                        newObject[key] = EP_odl(strHistory);
                    else if (obj1[key][0] === eprkey) {
                        newObject[key] = EPR_old(obj1[key][1], strHistory);
                    }
                    else if (obj1[key] && typeof obj1[key] === 'object') {
                        newObject[key] = Object.assign(EP_odl(strHistory), obj1[key]);
                        getKeyByValue(newObject[key], obj1[key], strHistory);
                    }
                });
            }
        }
    }
}
exports.StoreInstance = StoreInstance;