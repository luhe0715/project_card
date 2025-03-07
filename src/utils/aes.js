import CryptoJS from 'crypto-js'

export default {
  randomString(len) {
    len = len || 32;
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    var maxPos = $chars.length;
    var pwd = '';
    for (let i = 0; i < len; i++) {
      pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
  },
  //AES加密
  encryptAes(data, AesKey) {
    const aesKey = AesKey
    if (aesKey && data) {
      const key = CryptoJS.enc.Utf8.parse(aesKey);
      var word = CryptoJS.enc.Utf8.parse(data);
      var encrypted = CryptoJS.AES.encrypt(word, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
      return encrypted.toString();
      // NOSONAR *const encrypt = CryptoJS.AES.encrypt(data, key, {
      // NOSONAR   iv: CryptoJS.enc.Utf8.parse(aesKey.substr(0, 32)),
      // NOSONAR   mode: CryptoJS.mode.ECB,
      // NOSONAR   padding: CryptoJS.pad.Pkcs7
      // NOSONAR });
      // NOSONAR return encrypt.toString()*
    }

  },
//AES解密
  decryptAes(data, AesKey) {
    const aesKey = AesKey;
    if (aesKey && data) {
      const key = CryptoJS.enc.Utf8.parse(aesKey);
      const decrypt = CryptoJS.AES.decrypt(data, key, {
        iv: CryptoJS.enc.Utf8.parse(aesKey.substr(0, 32)),
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      });
      return JSON.parse(decrypt.toString(CryptoJS.enc.Utf8))
    }
  }
}
