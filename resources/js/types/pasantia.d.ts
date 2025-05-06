export interface Pasantia {
  id?: number;
  fecha_acta: string;
  fecha_inicio: string;
  duracion: number;
  fecha_fin: string;
  estado: string;
  monto: number;
  domicilio: string;
  tareas: string;
  alumno_carreras_id: number;
  docente_id: number;
  convenio_id: number;
}