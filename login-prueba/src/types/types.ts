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

export interface Solicitud {
  idSolicitudMSP: number
  fechaSolicitud: string
  idEstablecimiento: number
  idDirectorTecnico?: number
  idPropietario?: number
  tipoDeSolicitud: string
  reciboPagoTasasNumero?: string
  estadoSolicitud: string
  firmadoPorInspector: boolean
  firmaDirectorTecnico: boolean
  formularioImpresoOnlineConsultado: boolean
  formulario004FO056Presentado: boolean
  licenciaOriginalDepositadaTramitado: boolean
  idUsuario?: number
  nombreEstablecimiento?: string
  nombresDirector?: string
  apellidosDirector?: string
  nombrePropietario?: string
  nombreUsuario?: string
  }