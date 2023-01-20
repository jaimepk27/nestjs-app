import { readFileSync } from 'fs';
import { load } from 'js-yaml';
import { resolve } from 'path';

import { ConfigFactory, ConfigObject } from '@nestjs/config';

export function loadConfigFile(filename: string): ConfigObject {
  const filepath = resolve('config', filename);
  const file = readFileSync(filepath, { encoding: 'utf8' });

  return load(file);
}

export const ConfigFileLoader: ConfigFactory = () => {
  return loadConfigFile('application.yml');
};
