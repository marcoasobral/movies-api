export interface LoginPayload {
    usuario: string;
    senha: string;
  }
  
  export interface LoginResponse {
    token: string;
  }