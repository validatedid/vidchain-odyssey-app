
export interface CredentialId {
    id: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    placeOfBirth: string;
    currentAddress: string;
    city: string;
    state: string;
    zip: string;
    gender: string;
  }
  
  export interface verifiableKYC {
    id: string;
    documentNumber: string;
    documentType: string;
    name?: string;
    firstName?: string;
    surname?: string;
    lastName?: string;
    fullName: string;
    nationality: string;
    stateIssuer: string;
    issuingAuthority: string;
    dateOfExpiry: string;
    dateOfBirth: string;
    placeOfBirth: string;
    sex?: string;
    gender?: string;
    personalNumber: string;
  }
  
  
  
  