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
        if (!(yield knex.schema.hasTable("user"))) {
            yield knex.schema.createTable("user", (table) => {
                table.increments("id");
                table.string("account", 32).notNullable().unique();
                table.string("email", 255).notNullable();
                table.string("password_hash", 60).notNullable();
                table.string("username", 32).notNullable();
                table.timestamps(false, true);
            });
        }
        if (!(yield knex.schema.hasTable("spending"))) {
            yield knex.schema.createTable("spending", (table) => {
                table.increments("id");
                table.string("type", 20).notNullable();
                table.string("price", 10).notNullable();
                table.date("date").notNullable();
                table.string("remark", 255).notNullable();
                table.integer("user_id").unsigned().notNullable().references("user.id");
                table.timestamps(false, true);
            });
        }
        if (!(yield knex.schema.hasTable("asset"))) {
            yield knex.schema.createTable("asset", (table) => {
                table.increments("id");
                table.string("category", 10).notNullable();
                table.string("organization", 12).notNullable();
                table.string("type", 12).notNullable();
                table.string("value", 10).notNullable();
                table.float("interest_rate", 10).notNullable();
                table.string("remark", 255).notNullable();
                table.integer("user_id").unsigned().notNullable().references("user.id");
                table.timestamps(false, true);
            });
        }
        if (!(yield knex.schema.hasTable("content"))) {
            yield knex.schema.createTable("content", (table) => {
                table.increments("id");
                table.string("title", 40).notNullable();
                table.string("url", 255).notNullable();
                table.timestamps(false, true);
            });
        }
    });
}
exports.up = up;
function down(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        yield knex.schema.dropTableIfExists("content");
        yield knex.schema.dropTableIfExists("asset");
        yield knex.schema.dropTableIfExists("spending");
        yield knex.schema.dropTableIfExists("user");
    });
}
exports.down = down;
//# sourceMappingURL=20230608044331_auto-migrate.js.map