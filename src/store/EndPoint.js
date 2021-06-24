"use strict";
exports.__esModule = true;
var EndPoint = /** @class */ (function () {
    function EndPoint(adapter, map, type) {
        this.adapter = adapter;
        this.map = map;
        var a = String(map).split('.');
        a.shift();
        this._map = a.join('/');
    }
    EndPoint.prototype.get = function () {
        return this.adapter.get(this._map);
    };
    EndPoint.prototype.set = function (toSave) {
        this.adapter.set(this._map, toSave);
    };
    EndPoint.prototype.nullify = function () {
        this.adapter.nullify(this._map);
    };
    return EndPoint;
}());
exports.EndPoint = EndPoint;
