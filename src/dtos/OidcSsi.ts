export interface OidcClaimJson {
    essential?: boolean;
    value?: string;
    values?: string[];
  }
  
  export interface OidcClaimRequest {
    [x: string]: null | OidcClaimJson;
  }
  
  export interface OidcClaim {
    vc?: OidcClaimRequest;
    [x: string]: unknown;
  }