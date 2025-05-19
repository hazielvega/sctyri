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
  alumno_carreras_id?: number;
  docente_id?: number;
  convenio_id?: number;
}

export interface PasantiaFormProps {
    initialData?: Pasantia;
    onSubmitRoute: string;
    onSuccess?: () => void;
    processing: boolean;
    errors: Record<string, string>;
}

export interface PasantiaPageProps {
    pasantias: {
        data: Pasantia[];
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
    };
}