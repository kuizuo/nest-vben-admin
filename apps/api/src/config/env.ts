/**
 * 基础类型接口
 */
export type BaseType = boolean | number | string | undefined | null;

/**
 * 格式化环境变量
 * @param key 环境变量的键值
 * @param defaultValue 默认值
 * @param callback 格式化函数
 */
const fromatValue = <T extends BaseType = string>(
  key: string,
  defaultValue: T,
  callback?: (value: string) => T,
): T => {
  const value: string | undefined = process.env[key];
  if (typeof value === 'undefined') {
    return defaultValue;
  }
  if (!callback) {
    return value as unknown as T;
  }
  return callback(value);
};

export const env = (key: string, defaultValue: string = '') =>
  fromatValue(key, defaultValue);

export const envString = (key: string, defaultValue: string = '') =>
  fromatValue(key, defaultValue);

export const envNumber = (key: string, defaultValue: number = 0) =>
  fromatValue(key, defaultValue, (value) => {
    try {
      return Number(value);
    } catch {
      throw new Error(`${key} environment variable is not a number`);
    }
  });

export const envBoolean = (key: string, defaultValue: boolean = false) =>
  fromatValue(key, defaultValue, (value) => {
    try {
      return Boolean(JSON.parse(value));
    } catch {
      throw new Error(`${key} environment variable is not a boolean`);
    }
  });