import { homedir } from 'node:os';
import { join } from 'node:path';
import { readFile, writeFile, stat } from 'node:fs/promises';

const filePath = join(homedir(), 'weather-data.json');

const TOKEN_DICTIONARY = {
  token: 'token',
  city: 'city'
}

const saveKeyValue = async (key: string, value: string) => {
  let data: Record<string, string> = {};
  if (await isExist(filePath)) {
    const file = await readFile(filePath);
    data = JSON.parse(file.toString());
  }
  data[key] = value;
  await writeFile(filePath, JSON.stringify(data));
};

const getKeyValue = async (key: string) => {
  if (await isExist(filePath)) {
    const file = await readFile(filePath);
    const data = JSON.parse(file.toString());
    return data[key];
  }
  return undefined;
};

const isExist = async (path: string) => {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
};

export { saveKeyValue, getKeyValue, TOKEN_DICTIONARY };
