import {decode as atob, encode} from 'base-64';
import {WALLET_ERRORS} from './handleApiResponse';
import {decodeJWT} from './jwtHandler';
import {IEnterpriseAuthZToken} from '../dtos/Tokens';

/**
 * Decodes a Base64 string in an UTF-8 string format
 * @param input Base64 encoded string to decode
 */
function strB64dec(input: any) {
  try {
    return JSON.parse(atob(input));
  } catch (error) {
    throw new Error(WALLET_ERRORS.DECODING_BASE64_ERROR);
  }
}
/**
 * Encoded  a Base64 string in an UTF-8 string format
 * @param input Base64 encoded string to decode
 * change
 */
function strB64enc(input: any) {
  try {
    return encode(JSON.stringify(input));
  } catch (error) {
    throw new Error(WALLET_ERRORS.DECODING_BASE64_ERROR);
  }
}

function getEnterpriseDID(token: string): string {
  const {payload} = decodeJWT(token);
  return (payload as IEnterpriseAuthZToken).did;
}

function isOpenIdRequest(input: string): boolean {
  try {
    return input.startsWith('odysseyvidchain://did-auth');
  } catch (error) {
    return false;
  }
}

export {strB64dec, strB64enc, getEnterpriseDID, isOpenIdRequest};
