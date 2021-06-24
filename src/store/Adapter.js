"use strict";
exports.__esModule = true;
var node_json_db_1 = require("node-json-db");
var NodeJsonDBAdapter = /** @class */ (function () {
    function NodeJsonDBAdapter(config) {
        this.config = config;
        this.db = new node_json_db_1.JsonDB("TEST.DB", true, true, '/');
    }
    NodeJsonDBAdapter.prototype.set = function (map, toSave) {
        this.db.push(map, toSave);
    };
    NodeJsonDBAdapter.prototype.get = function (map) {
        return this.db.getData(map);
    };
    NodeJsonDBAdapter.prototype.nullify = function (map) {
        this.db.push(map, null);
    };
    return NodeJsonDBAdapter;
}());
exports.NodeJsonDBAdapter = NodeJsonDBAdapter;
