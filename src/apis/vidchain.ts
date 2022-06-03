import axios from 'axios';
import * as config from '../config/config';
import {handleError, handleSuccess} from '../utils/handleApiResponse';
import {strB64enc} from '../utils/utils';

async function getAuthzToken() {
  const body = {
    grantType: config.grantType,
    assertion: strB64enc(config.Entity),
    scope: config.scope,
  };
  try {
    const response = await axios.post(`${config.API_URL}/sessions`, body);
    return handleSuccess(response);
  } catch (error) {
    return handleError(error);
  }
}

async function entityName(did: String) {
  const token = await getAuthzToken();
  const authorization = {
    headers: {
      Authorization: `Bearer ${token.data.accessToken}`,
    },
  };
  try {
    const response = await axios.get(
      `${config.API_URL}/legal-entities?did=${did}`,
      authorization,
    );
    return handleSuccess(response);
  } catch (error) {
    return handleError(error);
  }
}

export {getAuthzToken, entityName};
