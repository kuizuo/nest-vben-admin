import { nanoid } from 'nanoid'

export function generateUUID(size: number = 21): string {
  return nanoid(size)
}

export function generateShortUUID(): string {
  return nanoid(10)
}

/**
 * 生成一个随机的值
 */
export function randomValue(
  size = 16,
  dict = 'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict',
): string {
  let id = ''
  let i = size
  const len = dict.length
  while (i--) id += dict[(Math.random() * len) | 0]
  return id
}
