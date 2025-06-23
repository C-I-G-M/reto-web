export interface AuthResponse {
  body: {
    user: User;
    refreshToken: string;
    accessToken: string;
    rol: string;
  };

}

export interface AuthResponseError {
  body: {
    error: string;
  };

}

export interface User {
  id: string;
  name: string;
  lastname: string;
  username: string;
  email: string;
  fechaNac: string;
  sexo: string;
  rol: string;
}

export interface AccessTokenResponse {
  statusCode: number;
  body: {
    accessToken: string;
  },
error?: string;


}