import definitions, { type ConfigKeys } from 'src/lib/config/items';

export function getFromEnv(
  env: NodeJS.ProcessEnv,
): Record<ConfigKeys, string> | object {
  return definitions
    .filter((definition) => definition.hasOwnProperty('envVar'))
    .reduce((envMap, definition) => {
      const { key, envVar } = definition;
      if (env[envVar]) {
        envMap[key] = env[envVar];
      }
      return envMap;
    }, {});
}
