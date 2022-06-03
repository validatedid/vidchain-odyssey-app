const API_URL = 'https://staging.vidchain.net/api/v1';
const CALLBACK_URL = 'odysseyvidchain://did-auth';
const REDIRECT_URI = 'odysseyvidchain://did-auth';
const IDENTITY_PROVIDER = 'vidchain://did-auth';
const EIDAS_URL = `${API_URL}/eidas/`;

//Legal Entity
const Entity = {
  iss: 'ODYSSEY APP',
  aud: 'vidchain-api',
  iat: 1605348738,
  exp: 1605349638,
  nonce: '7b9f5c6a-018c-4c16-be19-8caa266ea84c',
  apiKey: '4ae5f694-98f2-479c-a5be-2c0edb569fb33',
  callbackUrl: CALLBACK_URL,
};

const grantType = 'urn:ietf:params:oauth:grant-type:jwt-bearer';
const scope = 'vidchain profile entity';

export {
  Entity,
  grantType,
  scope,
  API_URL,
  REDIRECT_URI,
  IDENTITY_PROVIDER,
  EIDAS_URL,
};
