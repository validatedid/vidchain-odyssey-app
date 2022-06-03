import {AxiosResponse} from 'axios';
import {ApiResponse} from '../dtos/ApiResponse';

enum WALLET_ERRORS {
  PARSING_JWT_ERROR = 'Error when parsing the JWT token',
  PARSING_REQUEST_ERROR = 'Error when parsing the request',
  DECODING_BASE64_ERROR = 'Error decoding the base64 text',
  WALLET_NOT_FOUND = 'Wallet not found',
  SESSION_ERROR = 'Error connecting to the server',
}

function handleError(error: any): ApiResponse {
  return {success: false, status: 500, data: error.message};
}

function handleSuccess(response: AxiosResponse): ApiResponse {
  return {success: true, status: response.status, data: response.data};
}

export {WALLET_ERRORS, handleError, handleSuccess};
