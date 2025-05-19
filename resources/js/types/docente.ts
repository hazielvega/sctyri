export interface Docente {
    id?: number;
    nombre: string;
    apellido: string;
    rol: string;
}

export interface DocenteFormProps {
    initialData?: Docente;
    onSubmitRoute: string;
    onSuccess?: () => void;
    processing: boolean;
    errors: Record<string, string>;
}

export interface DocentePageProps {
    docentes: {
        data: Docente[];
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
    };
}