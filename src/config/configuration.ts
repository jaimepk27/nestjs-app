import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { resolve } from 'path';

const YAML_CONFIG_FILENAME = 'config/application.yml';

export default () => {
  return yaml.load(
    readFileSync(resolve(YAML_CONFIG_FILENAME), 'utf8'),
  ) as Record<string, any>;
};
