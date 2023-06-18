"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
function up(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        yield knex.schema.alterTable("spending", (table) => {
            table.specificType("price", "real").notNullable().alter();
        });
        yield knex.schema.alterTable("asset", (table) => {
            table.specificType("value", "real").notNullable().alter();
        });
    });
}
exports.up = up;
function down(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        yield knex.schema.alterTable("asset", (table) => {
            table.string("value", 10).notNullable().alter();
        });
        yield knex.schema.alterTable("spending", (table) => {
            table.string("price", 10).notNullable().alter();
        });
    });
}
exports.down = down;
//# sourceMappingURL=20230614052607_auto-migrate.js.map