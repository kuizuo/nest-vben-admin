import CryptoJS from 'crypto-js';

const key = CryptoJS.enc.Utf8.parse('kuizuoabcdefe9bc');
const iv = CryptoJS.enc.Utf8.parse('0123456789kuizuo');

export function AES_enc(data) {
  if (!data) return data;
  const enc = CryptoJS.AES.encrypt(data, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return enc.toString();
}

export function AES_dec(data) {
  if (!data) return data;
  const dec = CryptoJS.AES.decrypt(data, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return dec.toString(CryptoJS.enc.Utf8);
}

export function MD5(str: string) {
  return CryptoJS.MD5(str).toString();
}

export function Base64_decode(str: string) {
  return CryptoJS.enc.Base64.parse(str).toString(CryptoJS.enc.Utf8);
}

export function Base64_encode(str: string) {
  return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(str));
}
