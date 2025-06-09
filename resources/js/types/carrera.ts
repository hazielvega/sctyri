export interface Carrera {
    id?: number;
    nombre: string;
    facultad_id?: number;
}

export interface CarreraFormProps {
    initialData?: Carrera;
    onSubmitRoute: string;
    onSuccess?: () => void;
    processing: boolean;
    errors: Record<string, string>;
}

export interface CarreraPageProps {
    carreras: {
        data: Carrera[];
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
    };
}