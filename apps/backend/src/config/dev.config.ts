export default {
  rootRoleId: 1,
  appName: process.env.APP_NAME,
  mysql: {
    type: 'mysql',
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    synchronize: process.env.MYSQL_SYNC,
    entities: ['@/entities/*.entity.ts'],
    logging: false,
    timezone: '+08:00', // 东八区
  },
  mongo: {
    url: process.env.MONGO_URL,
  },
  es: {
    url: process.env.ES_URL,
  },
  redis: {
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD,
    db: process.env.REDIS_DATEBASE,
  },
  jwt: {
    secret: process.env.JWT_SECRET || '123456',
    expiresIn: '24h',
  },
  swagger: {
    enable: process.env.SWAGGER_ENABLE === 'true',
    path: process.env.SWAGGER_PATH,
    title: process.env.SWAGGER_TITLE,
  },
  email: {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
};
