/* 产引入jsencrypt实现数据RSA加密 */
// NOSONAR import JSEncrypt from 'jsencrypt' // 处理长文本数据时报错 jsencrypt.js Message too long for RSA
/* 产引入encryptlong实现数据RSA加密 */
// NOSONAR import Encrypt from 'encryptlong' // encryptlong是基于jsencrypt扩展的长文本分段加解密功能。
// import NodeRSA from 'node-rsa'
import { JSEncrypt } from 'jsencrypt/lib/JSEncrypt'
// let NodeRSA = require('node-rsa');
// 公钥key
const publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCdxpTDFJHV1DpsNxDHtBfx4-yHBACn5JC-CqvzdSE5JWvluLCHY_LvNWQdTJKvKEzfCJz-qEd6XUgrRqR3WelHZbTw__-56veZKzQ4qp9A-XC-HxM19-4snPCdd5kOzR66iadE_lp08e2VM28I9OQn0wQnXiWdzsj57uA-dcI02QIDAQAB'
// 私钥key
const privateKey = 'MIIBUwIBADANBgkqhkiG9w0BAQEFAASCAT0wggE5AgEAAkEA0vfvyTdGJkdbHkB8\n' +
  'mp0f3FE0GYP3AYPaJF7jUd1M0XxFSE2ceK3k2kw20YvQ09NJKk+OMjWQl9WitG9p\n' +
  'B6tSCQIDAQABAkA2SimBrWC2/wvauBuYqjCFwLvYiRYqZKThUS3MZlebXJiLB+Ue\n' +
  '/gUifAAKIg1avttUZsHBHrop4qfJCwAI0+YRAiEA+W3NK/RaXtnRqmoUUkb59zsZ\n' +
  'UBLpvZgQPfj1MhyHDz0CIQDYhsAhPJ3mgS64NbUZmGWuuNKp5coY2GIj/zYDMJp6\n' +
  'vQIgUueLFXv/eZ1ekgz2Oi67MNCk5jeTF2BurZqNLR3MSmUCIFT3Q6uHMtsB9Eha\n' +
  '4u7hS31tj1UWE+D+ADzp59MGnoftAiBeHT7gDMuqeJHPL4b+kC+gzV4FGTfhR9q3\n' +
  'tTbklZkD2A=='

//NodeRSA解密---响应的数据
export function rsaDecryptByPublicKey(data) {
  const publicKeyS = new JSEncrypt()
  publicKeyS.setPrivateKey('-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCdxpTDFJHV1DpsNxDHtBfx4-yHBACn5JC-CqvzdSE5JWvluLCHY_LvNWQdTJKvKEzfCJz-qEd6XUgrRqR3WelHZbTw__-56veZKzQ4qp9A-XC-HxM19-4snPCdd5kOzR66iadE_lp08e2VM28I9OQn0wQnXiWdzsj57uA-dcI02QIDAQAB-----END PUBLIC KEY-----')
  return publicKeyS.decrypt(data, "utf8")
}

//NodeRSA加密---请求头headers所带的encrypttoken
export function rsaPublicData(data) {
  // let pubKey = new NodeRSA(publicKey, 'pkcs8-public');
  // pubKey.setPublicKey({ encryptionScheme: 'PKCS1' })
  let pubKey = new JSEncrypt();
  pubKey.setPublicKey(publicKey, 'pkcs8-public')
  return pubKey.encrypt(data, 'base64')
}



