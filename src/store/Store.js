"use strict";
exports.__esModule = true;
var Adapter_1 = require("./Adapter");
var EndPoint_1 = require("./EndPoint");
var StoreInstance = /** @class */ (function () {
    function StoreInstance(config, dbAdapter) {
        if (dbAdapter === void 0) { dbAdapter = Adapter_1.NodeJsonDBAdapter; }
        this.config = config;
        this.dbAdapter = dbAdapter;
        this.adapter = new dbAdapter(config);
    }
    StoreInstance.prototype.createEndPoints = function () {
        var _this = this;
        var context = this;
        var EP = function (map) {
            return _this.EP.call(context, map);
        };
        function EPR(type, map) {
            return context.EPR.call(context, type, map);
        }
        return {
            EP: EP, EPR: EPR
        };
    };
    StoreInstance.prototype.EP = function (map) {
        return new EndPoint_1.EndPoint(this.adapter, map);
    };
    StoreInstance.prototype.EPR = function (type, map) {
        var types = ['string', 'number', 'boolean', 'Json', 'JsonArray'];
        if (types.includes(type)) {
            return new EndPoint_1.EndPoint(this.adapter, map, type);
        }
        throw new Error(type + " - Is not correct type. Expected one of " + types);
    };
    return StoreInstance;
}());
exports.StoreInstance = StoreInstance;
