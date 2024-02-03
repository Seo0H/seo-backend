const configItems = [
  {
    key: 'dbUrl',
    envVar: 'DB_URL',
  },
  {
    key: 'dbSSLPath',
    envVar: 'DB_SSL_PATH',
  },
  {
    key: 'sessionSecret',
    envVar: 'SESSION_SECRET',
  },
  {
    key: 'redisUrl',
    envVar: 'REDIS_URL',
  },
] as const;

export type ConfigItems = typeof configItems;
export type ConfigKeys = ConfigItems[number]['key'];
export type ConfigEnvVars = ConfigItems[number]['envVar'];

export default configItems;
