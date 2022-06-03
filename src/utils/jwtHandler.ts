import {JWTDecoded} from '../dtos/Tokens';
import base64url from 'uport-base64url';

function decodeJWT(jwt: string): JWTDecoded {
  if (!jwt) throw new Error('no JWT passed into decodeJWT');
  const parts: RegExpMatchArray | null = jwt.match(
    /^([a-zA-Z0-9_-]+)\.([a-zA-Z0-9_-]+)\.([a-zA-Z0-9_-]+)$/,
  );
  if (parts) {
    return {
      header: JSON.parse(base64url.decode(parts[1])),
      payload: JSON.parse(base64url.decode(parts[2])),
      signature: parts[3],
      data: `${parts[1]}.${parts[2]}`,
    };
  }
  throw new Error('Incorrect format JWT');
}

export {decodeJWT};
