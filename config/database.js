module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'bookshelf',
      settings: {
        client: 'postgres',
        host: env('DATABASE_HOST', '127.0.0.1'),
        port: env.int('DATABASE_PORT', 5432),
        database: env('DATABASE_NAME', 'forum_hcmus'),
        username: env('DATABASE_USERNAME', 'admin'),
        password: env('DATABASE_PASSWORD', 'admin'),
        ssl: {
          rejectUnauthorized: env.bool('DATABASE_SSL_SELF', false),
        },
      },
      options: {
        ssl: env.bool('DATABASE_SSL', false),
        "pool":{
            "min":0,
             "max":15,
              "idleTimeoutMillis":30000,
              "createTimeoutMillis":30000,
             "acquireTimeoutMillis":30000
        }
      }
    }
  }
})
