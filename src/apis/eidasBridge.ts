import axios from 'axios';
import * as config from '../config/config';
import {SignPayload} from '../dtos/Eidas';
import {handleError, handleSuccess} from '../utils/handleApiResponse';

async function signature(credential: SignPayload) {
  try {
    const response = await axios.post(
      `${config.EIDAS_URL}/signatures`,
      credential,
    );
    return handleSuccess(response);
  } catch (error) {
    return handleError(error);
  }
}

export {signature};
