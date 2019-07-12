const path = require('path');

const { DB_USERNAME, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT, APP_PORT } = process.env;

module.exports = {
    port: APP_PORT,
    db: {
        client: 'pg',
        version: '11.4',
        connection: {
            host: DB_HOST,
            port: DB_PORT,
            user: DB_USERNAME,
            password: DB_PASSWORD,
            database: DB_NAME,
            timezone: 'UTC',
        },
        migrations: {
            directory: path.join(__dirname, '../db/migrations'),
        },
        seeds: {
            directory: path.join(__dirname, '../db/seeds'),
        },
    },
};
