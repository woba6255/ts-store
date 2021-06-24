"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EndPoint {
    constructor(adapter, map, type) {
        this.adapter = adapter;
        this.map = map;
        this.type = type;
        const a = String(map).split('.');
        a.shift();
        this._map = '/' + a.join('/');
    }
    get() {
        return this.adapter.get(this._map);
    }
    set(toSave) {
        if (this.type)
            if (!this.checkType(toSave))
                throw new Error(`[TYPE ERROR] PREDICTED: ${this.type}; TOOK: ${typeof toSave} (${toSave})`);
        this.adapter.set(this._map, toSave);
    }
    nullify() {
        this.adapter.nullify(this._map);
    }
    checkType(toCheckType) {
        if (this.type && toCheckType) {
            const savedType = this.type;
            if (savedType === typeof toCheckType)
                return true;
            else
                return ['Json', 'JsonArray'].includes(savedType) && isJsonStringValid(toCheckType);
        }
    }
}
exports.EndPoint = EndPoint;
function isJsonStringValid(str) {
    try {
        JSON.parse(str);
    }
    catch (e) {
        return false;
    }
    return true;
}
