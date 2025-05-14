import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';
import { FormDataType } from '@inertiajs/inertia-react';
import { FormDataConvertible } from '@inertiajs/core';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface PageProps extends SharedData {
    // Aquí puedes agregar props específicas de cada página
    [key: string]: unknown;
}

export interface FlashMessage {
    success?: string;
    error?: string;
    warning?: string;
    info?: string;
    [key: string]: unknown; // Para mensajes personalizados
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    flash?: FlashMessage;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface ConvenioTipo extends Record<string, FormDataConvertible> {
    id?: number;
    nombre: string;
}

export interface ConvenioTipoFormProps {
    initialData?: ConvenioTipo;
    onSubmitRoute: string;
    onSuccess?: () => void;
    processing: boolean;
    errors: Record<string, string>;
}

export interface ConvenioTiposPageProps {
    convenioTipos: {
        data: ConvenioTipo[];
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
    };
}