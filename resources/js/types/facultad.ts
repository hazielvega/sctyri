export interface Facultad {
    id?: number;
    nombre: string;
}

export interface FacultadFormProps {
    initialData?: Facultad;
    onSubmitRoute: string;
    onSuccess?: () => void;
    processing: boolean;
    errors: Record<string, string>;
}

export interface FacultadPageProps {
    facultades: {
        data: Facultad[];
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
    };
}