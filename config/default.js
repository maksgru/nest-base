module.exports = {
  configStorage: 'local',
  app: {
    name: 'web_app',
    hostName: 'localhost',
    port: 3800,
    accessTokenExpiresIn: 0,
    refreshTokenExpiresIn: 0,
    jwtSecret: '',
    swaggerEnabled: true,
  },
  db: {
    host: 'localhost',
    port: 5432,
    username: '',
    password: '',
    database: '',
  },
  mail: {
    service: 'gmail',
    user: '',
    pass: '',
    from: '',
  },
};
