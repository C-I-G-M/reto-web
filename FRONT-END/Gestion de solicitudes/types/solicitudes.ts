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

export interface Establecimiento {
  idEstablecimiento: number
  nombreEstablecimiento: string
  direccionCalleNumero: string
  barrioSector: string
  idMunicipio: number
  ciudad: string
  tipoEstablecimiento: string
  rncEstablecimiento: string
  telefonoEstablecimiento?: string
  correoElectronicoEstablecimiento?: string
  fechaApertura?: string
  representanteTipo?: string
  tipoActividad?: string
  nombreResponsable?: string
  notaAdicional?: string
}

export interface DirectorTecnico {
  idDirector: number
  nombresDirector: string
  apellidosDirector: string
  cedulaDirector: string
  direccionDirectorCalleNumero?: string
  barrioSectorDirector?: string
  idMunicipioDirector?: number
  ciudadDirector?: string
  correoDirector?: string
  telefonosDirector?: string
  correoElectronicoDirector?: string
  tituloProfesional?: string
  exequatur?: string
  especialidad?: string
  numeroExequatur?: string
  fechaCaducidadExequatur?: string
}

export interface Propietario {
  idPropietario: number
  tipoPropietario: string
  cedulaPropietario: string
  apellidoPropietario: string
  nombreRazonSocial: string
  rncPropietario?: string
  direccionPropietario?: string
  idMunicipioPropietario?: number
  telefonoPropietario?: string
  celularPropietario?: string
  correoElectronicoPropietario?: string
}
