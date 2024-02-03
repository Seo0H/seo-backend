import { ConfigKeys } from 'src/lib/config/items';
import { getFromEnv } from 'src/lib/config/utils';

export default class Config {
  static instance: Config;

  private envConfig: Record<ConfigKeys, string> | object;

  constructor(env: NodeJS.ProcessEnv) {
    if (Config.instance) {
      return Config.instance;
    }

    this.envConfig = getFromEnv(env);
    Config.instance = this;
  }

  get(key: ConfigKeys) {
    if (!this.envConfig.hasOwnProperty(key)) {
      throw new Error(`config itemd ${key} not defined in lib/config/items.ts`);
    }

    return this.envConfig[key];
  }
}
