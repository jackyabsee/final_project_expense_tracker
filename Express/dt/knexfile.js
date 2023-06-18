"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = require("./env");
// Update with your config settings.
const config = {
    development: {
        client: "pg",
        connection: {
            database: env_1.env.DB_NAME,
            user: env_1.env.DB_USERNAME,
            password: env_1.env.DB_PASSWORD,
            host: env_1.env.DB_HOST,
            port: env_1.env.DB_PORT,
            multipleStatements: true,
        }
    },
    staging: {
        client: "postgresql",
        connection: {
            database: "my_db",
            user: "username",
            password: "password"
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: "knex_migrations"
        }
    },
    // ci: {
    //   client: 'pg',
    //   connection: {
    //     database: env.POSTGRES_DB,
    //     user: env.POSTGRES_USER,
    //     password: env.POSTGRES_PASSWORD,
    //     host: env.POSTGRES_HOST,
    //     port: env.POSTGRES_PORT,
    //     multipleStatements: true,
    //     debug: true,
    //   },
    // },
    production: {
        client: "postgresql",
        connection: {
            database: "my_db",
            user: "username",
            password: "password"
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: "knex_migrations"
        }
    }
};
module.exports = config;
//# sourceMappingURL=knexfile.js.map