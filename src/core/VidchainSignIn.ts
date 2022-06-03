import {Linking} from 'react-native';
import Toast from 'react-native-simple-toast';
import * as siopDidAuth from '@validatedid/did-auth';
import * as config from '../config/config';
import * as vidchain from '../apis/vidchain';
import {getEnterpriseDID} from '../utils/utils';
import {
  DidAuthRequestOpts,
  ObjectPassedBy,
  DidAuthResponseMode,
  DidAuthResponseContext,
  UriRequest,
} from '../dtos/DidAuthTypes';
import {OidcClaim} from '../dtos/OidcSsi';

const signInWithVidchain = async () => {
  const uriRequest = await generateJwtRequest();

  const uriDecoded =
    decodeURIComponent(uriRequest.urlEncoded) + '&client_name=Odyssey App';

  const supported = await Linking.canOpenURL(uriDecoded);
  if (supported) {
    await Linking.openURL(uriDecoded);
  } else {
    Toast.showWithGravity(
      `Don't know how to open URI: ${uriDecoded}`,
      Toast.LONG,
      Toast.CENTER,
    );
  }
};

const generateJwtRequest = async (): Promise<UriRequest> => {
  const sessionToken = await vidchain.getAuthzToken();
  const jwt: string = sessionToken.data.accessToken;
  const did: string = getEnterpriseDID(jwt);

  const claim: OidcClaim = {
    vc: {
      VerifiableIdCredential: {essential: true},
    },
  };
  //We don't generate a state, but the library will manage the state
  const requestOpts: DidAuthRequestOpts = {
    oidpUri: config.IDENTITY_PROVIDER,
    redirectUri: config.REDIRECT_URI,
    requestObjectBy: {
      type: ObjectPassedBy.VALUE,
    },
    signatureType: {
      signatureUri: `${config.API_URL}/signatures`,
      did: did,
      authZToken: jwt,
      kid: `${did}#key-1`,
    },
    registrationType: {
      type: ObjectPassedBy.REFERENCE,
      referenceUri: `https://dev.vidchain.net/api/v1/identifiers/${did};transform-keys=jwks`,
    },
    responseMode: DidAuthResponseMode.FRAGMENT,
    responseContext: DidAuthResponseContext.RP,
    claims: claim,
  };
  const uriRequest: UriRequest = await siopDidAuth.createUriRequest(
    requestOpts,
  );
  return uriRequest;
};

export {signInWithVidchain};
