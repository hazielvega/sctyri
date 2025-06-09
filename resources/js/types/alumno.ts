export interface Alumno {
    id?: number;
    nombre: string;
    apellido: string;
    dni: string;
}

export interface AlumnoFormProps {
    initialData?: Alumno;
    onSubmitRoute: string;
    onSuccess?: () => void;
    processing: boolean;
    errors: Record<string, string>;
}

export interface AlumnoPageProps {
    alumnos: {
        data: Alumno[];
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
    };
}