import getConfig from 'next/config';

import crypto from 'crypto';

export type EncryptionPayload = {
  encryptedMessage: string;
  iv: string;
};

const {serverRuntimeConfig} = getConfig();

export const encryptMessage = (message: string, address: string): EncryptionPayload => {
  const algorithm = 'aes-256-cbc';
  // generate 16 bytes of random data
  const iv = address.slice(0, 16).padEnd(16, '0');
  // the cipher function
  const cipher = crypto.createCipheriv(algorithm, serverRuntimeConfig.appSecret, iv);
  // encrypt the message
  // input encoding
  // output encoding
  let encryptedMessage = cipher.update(message, 'utf-8', 'hex');

  encryptedMessage += cipher.final('hex');

  const encryptionPayload = {
    encryptedMessage,
    iv,
  };

  return encryptionPayload;
};

export const decryptMessage = (encrypted: string, address: string): string => {
  const algorithm = 'aes-256-cbc';
  // generate 16 bytes of random data
  const iv = address.slice(0, 16).padEnd(16, '0');

  const decipher = crypto.createDecipheriv(algorithm, serverRuntimeConfig.appSecret, iv);

  let decryptedMessage = decipher.update(encrypted, 'hex', 'utf-8');
  decryptedMessage += decipher.final('utf-8');

  return decryptedMessage;
};
