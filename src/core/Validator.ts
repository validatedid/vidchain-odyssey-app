import * as siopDidAuth from '@validatedid/did-auth';
import {DidAuthVerifyOpts, DidAuthResponsePayload} from '../dtos/DidAuthTypes';
import * as vidchain from '../apis/vidchain';
import * as config from '../config/config';
import {decodeJWT} from '../utils/jwtHandler';

const validateAuthResponse = async (authResponseToken: string) => {
  const sessionToken = await vidchain.getAuthzToken();
  const authZToken: string = sessionToken.data.accessToken;

  const {payload} = decodeJWT(authResponseToken);

  const optsVerify: DidAuthVerifyOpts = {
    verificationType: {
      verifyUri: `${config.API_URL}/signature-validations`,
      authZToken,
    },
    nonce: (payload as DidAuthResponsePayload).nonce,
  };
  const validationResponse = await siopDidAuth.verifyDidAuthResponse(
    authResponseToken,
    optsVerify,
  );
  return validationResponse;
};

export {validateAuthResponse};
