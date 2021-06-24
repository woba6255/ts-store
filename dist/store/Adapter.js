"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_json_db_1 = require("node-json-db");
class NodeJsonDBAdapter {
    constructor(config) {
        this.config = config;
        this.db = new node_json_db_1.JsonDB("TEST.DB", true, true, '/');
    }
    set(map, toSave) {
        this.db.push(map, toSave);
    }
    get(map) {
        return this.db.getData(map);
    }
    nullify(map) {
        this.db.push(map, null);
    }
}
exports.NodeJsonDBAdapter = NodeJsonDBAdapter;
