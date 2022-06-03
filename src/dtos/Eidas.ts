import { Credential, VerifiableCredential } from "./VP";

export interface SignPayload {
  issuer: string;
  payload: Credential | VerifiableCredential;
  type: string;
  expiresIn?: number; // in seconds
}
