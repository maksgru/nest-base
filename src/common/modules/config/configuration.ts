import * as config from 'config';
import * as CONFIG_VARIABLES from '../../../../config/configVariables.json';
import { VARIABLES_STORAGE_ENUM } from './enums';

export default (): unknown => {
  const variablesStorage = config.get<VARIABLES_STORAGE_ENUM>('configStorage');
  switch (variablesStorage) {
    case VARIABLES_STORAGE_ENUM.NODE_ENV:
      return loadFromEnv();
    default:
      return config.util.loadFileConfigs();
  }
};

const loadFromEnv = () => {
  const merge = (values: object) =>
    Object.entries(values).reduce((acc, [key, val]) =>
      (typeof val === 'object'
        ? { ...acc, [key]: merge(val) }
        : { ...acc, [key]: process.env[val] })
    , {});
  return merge(CONFIG_VARIABLES);
};
