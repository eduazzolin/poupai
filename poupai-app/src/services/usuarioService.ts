import CryptoJS from 'crypto-js';

export function criptografarSenha(senha) {
  var hash = CryptoJS.SHA256(senha);
  return hash.toString(CryptoJS.enc.Hex);
}

